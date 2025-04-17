const { getDailyCleaningProtocolByPathogenID, getTerminalCleaningProtocolByPathogenID } = require('../services/cleaningProtocolService');
const { getPPEDetailsByPathogenID, getPPERoutine } = require('../services/ppeDetailsService');
const { getHandHygieneDetailsByPathogenID, getHandHygieneRoutine } = require('../services/handHygieneDetailsService');
const { getWasteDetailsByPathogenID, getWasteRoutine } = require('../services/wasteDetailsService');
const { getDailyRoutineProtocol, getTerminalRoutineProtocol } = require('../services/cleaningProtocolService');
const { getDailyRoutineTimings, getDailySpecialisedTimings, getTerminalRoutineTimings, getTerminalSpecialisedTimings } = require('../services/cleaningTimingsServices');
const { protocol } = require('socket.io-client');
//const { getTerminalRoutineTimings, getTerminalSpecialisedTimings } = require('../models/cleaningTimingsModels');

const createSpecialisedTask = async (dailyCleaning, pathogenID, bedNo, wardNo) => {

    let protocolDetails;
    let ppeDetails;
    let handHygieneDetails;
    let wasteDetail;
    let timeToCompleteTask;

    let task;
  
    protocolDetails = dailyCleaning
      ? await getDailyCleaningProtocolByPathogenID(pathogenID)
      : await getTerminalCleaningProtocolByPathogenID(pathogenID);
  
    ppeDetails = await getPPEDetailsByPathogenID(pathogenID);
    handHygieneDetails = await getHandHygieneDetailsByPathogenID(pathogenID);
    wasteDetail = await getWasteDetailsByPathogenID(pathogenID);

    timeToCompleteTask =dailyCleaning
    ?  await getDailySpecialisedTimings()
    : await getTerminalSpecialisedTimings();

    if (!protocolDetails || !ppeDetails || !handHygieneDetails || !wasteDetail || !timeToCompleteTask) {
      console.warn("Missing details for creating tasks.");
      return null;
    }

    task = {
      protocol_name: protocolDetails.protocol_name,
      cleaning_agent: protocolDetails.agent,
      preparation: protocolDetails.preparation,
      adjunct: protocolDetails.adjunct,
      mask: ppeDetails.mask,
      clothing: ppeDetails.clothing,
      gloves: ppeDetails.gloves,
      eye_protection: ppeDetails.eye_protections,
      hand_hygiene: handHygieneDetails.hand_wash,
      single_use: wasteDetail.single_use,
      stream: wasteDetail.stream,
      ward_number: wardNo,
      bed_number: bedNo,
      staff_first_name: "",
      date_created: new Date().toISOString().split("T")[0],
      time_created: new Date().toISOString().split("T")[1].split(".")[0],
      notes: "",
      staff_last_name: "",
      last_updated_date: null,
      last_updated_time: null,
      time_to_complete: timeToCompleteTask.duration,
      complete: "",
    };

    return task;
};

const createRoutineTask = async (dailyCleaning, bedNo, wardNo) => {

  let defaultProtocol;
  let ppeDetails;
  let handHygieneDetails;
  let wasteDetail;

  let timeToCompleteTask;

  let task;

  defaultProtocol = dailyCleaning
    ? await getDailyRoutineProtocol()
    : await getTerminalRoutineProtocol();

  ppeDetails = await getPPERoutine();

  handHygieneDetails = await getHandHygieneRoutine();

  wasteDetail = await getWasteRoutine();

  timeToCompleteTask = dailyCleaning
  ? await getDailyRoutineTimings()
  : await getTerminalRoutineTimings();

  if (!defaultProtocol) {
    console.warn("Default cleaning protocol not found.");
    return null;
  }

  task = {
    protocol_name: defaultProtocol.protocol_name,
    cleaning_agent: defaultProtocol.agent,
    preparation: defaultProtocol.preparation,
    adjunct: defaultProtocol.adjunct,
    mask: ppeDetails.mask,
    clothing: ppeDetails.clothing,
    gloves: ppeDetails.gloves,
    eye_protection: ppeDetails.eye_protections,
    hand_hygiene: handHygieneDetails.hand_wash,
    single_use: wasteDetail.single_use,
    stream: wasteDetail.stream,
    ward_number: wardNo,
    bed_number: bedNo,
    staff_first_name: "",
    date_created: new Date().toISOString().split("T")[0],
    time_created: new Date().toISOString().split("T")[1].split(".")[0],
    notes: "",
    staff_last_name: "",
    last_updated_date: null,
    last_updated_time: null,
    time_to_complete: timeToCompleteTask.duration,
    complete: "",
  };

  return task;
};

const createMultiplePosResultsCleaningTask = async (dailyCleaning, validLabResults, bedNumber, wardNumber) => {

  // get ALL of a specific patient's positive results
  const positivePathogenIDs = validLabResults.map(result => result.pathogen_id);

  let relevantDisinfection = [];
  let relevantPPE = [];
  let relevantHandHygiene = [];
  let relevantWaste = [];

  for (const pathogenID of positivePathogenIDs) {
    // for each pathogen get its disinfection protocols
    const protocol = dailyCleaning
    ? await getDailyCleaningProtocolByPathogenID(pathogenID)
    : await getTerminalCleaningProtocolByPathogenID(pathogenID);

    relevantDisinfection.push(protocol);
    // for each pathogen get its ppe details
    const ppe = await getPPEDetailsByPathogenID(pathogenID);
    relevantPPE.push(ppe);

    // for each pathogen get its hand hygiene
    const handHygiene = await getHandHygieneDetailsByPathogenID(pathogenID);
    relevantHandHygiene.push(handHygiene);

    // for each pathogen get its waste protocols
    const waste = await getWasteDetailsByPathogenID(pathogenID);
    relevantWaste.push(waste);
  }
  // Disinfection protocol is same for all daily cleaning

  // Select strictest hand hygiene (prioritize soap + water)
  const strictestHandHygiene = relevantHandHygiene.some(protocol => protocol.hand_wash.includes("Soap + water"))
  ? "Soap + water"
  : "Alcohol/soap + water";

  // Determine strictest PPE requirements
  const strictestPPE = {
    mask: relevantPPE.some(p => p.mask === "FFP2") ? "FFP2" : "No",
    clothing: relevantPPE.some(p => p.clothing === "Gown") ? "Gown" : "Apron",
    gloves: "Yes",
    eye_protection: relevantPPE.some(p => p.eye_protections === "Yes") ? "Yes" : "No"
  };

  // Determine strictest waste protocol
  const strictestWaste = {
    single_use: relevantWaste.some(p => p.single_use === "Yes") ? "Yes" : "No",
    stream: relevantWaste.some(p => p.stream === "Red") ? "Red" : "Green"
  };

  const cleaningTask = {
    protocol_name: "Multiple Pathogens",
    cleaning_agent: "Teepol/Presept",
    preparation: "1 pump: 1 tab",
    adjunct: "N/A",
    mask: strictestPPE.mask,
    clothing: strictestPPE.clothing,
    gloves: strictestPPE.gloves,
    eye_protection: strictestPPE.eye_protection,
    hand_hygiene: strictestHandHygiene,
    single_use: strictestWaste.single_use,
    stream: strictestWaste.stream,
    ward_number: wardNumber,
    bed_number: bedNumber,
    staff_first_name: "",
    date_created: new Date().toISOString().split("T")[0],
    time_created: new Date().toISOString().split("T")[1].split(".")[0],
    notes: "",
    staff_last_name: "",
    last_updated_date: null,
    last_updated_time: null,
    time_to_complete: "40 minutes",
    complete: "",
  };

  return cleaningTask;
};

module.exports = { createRoutineTask, createSpecialisedTask, createMultiplePosResultsCleaningTask }
