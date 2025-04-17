const { getBedsInWardByWardNumber } = require('../services/wardDataService');
const { insertTask, modifyTask, getTasksByWardNumber } = require('../services/tasksServices');
const { prioritiseTasks } = require('./taskPrioritisationUtils');
const { checkCleaningType } = require('./tasksChecksUtils');
const { getStaffSchedules } = require('../services/staffService');
const { createSpecialisedTask, createRoutineTask, createMultiplePosResultsCleaningTask } = require('./taskCreationUtils');
const { scheduleDailyCleaningStaff } = require('../utils/scheduleUtils');
const { getPatientMRNByWardAndBedNumber } = require('../services/labDataService');


const createPrioritisedListOfTasks = async () => {

  wardBeds1 = await getBedsInWardByWardNumber(1);
  wardBeds2 = await getBedsInWardByWardNumber(2);
  wardBeds3 = await getBedsInWardByWardNumber(3);

  const dailyCleaningTasksWard1 = await createDailyCleaningTasksByWard(wardBeds1, 1);
  const dailyCleaningTasksWard2 = await createDailyCleaningTasksByWard(wardBeds2, 2);
  const dailyCleaningTasksWard3 = await createDailyCleaningTasksByWard(wardBeds3, 3);

  // get tasks from db
  const createdTasksWard1 = await getTasksByWardNumber(1);
  const createdTasksWard2 = await getTasksByWardNumber(2);
  const createdTasksWard3 = await getTasksByWardNumber(3);

  const prioritisedListOfTasks1 = await prioritiseTasks(createdTasksWard1);
  const prioritisedListOfTasks2 = await prioritiseTasks(createdTasksWard2);
  const prioritisedListOfTasks3 = await prioritiseTasks(createdTasksWard3);

  const allTasks = [...prioritisedListOfTasks1, ...prioritisedListOfTasks2, ...prioritisedListOfTasks3];

  return allTasks;
};

const handleStaffTaskAssignment = async () => {
  const allTasks = await createPrioritisedListOfTasks();
  let currentDate = '2025-02-11';
  const dailyCleaningStaffList = await getStaffSchedules('Cleaning Staff', currentDate, 'daily');
  // const cleaningStaffSchedulesTerminal = await getStaffSchedules("Cleaning Staff", currentDate, "terminal");
  // const managementStaffSchedulesDaily = await getStaffSchedules("Management", currentDate, "daily");
  // const managementStaffSchedulesTerminal = await getStaffSchedules("Management", currentDate, "terminal");
  let assignedTasks = [];

  for (const staffMember of dailyCleaningStaffList) {
    const taskIds = await scheduleDailyCleaningStaff(allTasks, staffMember);
    assignedTasks.push({ staffId: staffMember.id, staffName: `${staffMember.first_name} ${staffMember.last_name}`, tasks: taskIds });
  }

  return assignedTasks;
};

// const handleNewLabResultCleaning = async (patientMRN, bedNumber, wardNumber) => {

//   const modifiedCleaningTask = await createNewLabResultCleaningTasks(patientMRN, bedNumber, wardNumber);
  
//   // assign to floating cleaner
//   // get floating cleaner name
//   //add it to task

//   const cleaningTasksWard1 = await getTasksByWardNumber(1);
//   const cleaningTasksWard2 = await getTasksByWardNumber(2);
//   const cleaningTasksWard3 = await getTasksByWardNumber(3);

//   const prioritisedListOfTasks1 = await prioritiseTasks(cleaningTasksWard1);
//   const prioritisedListOfTasks2 = await prioritiseTasks(cleaningTasksWard2);
//   const prioritisedListOfTasks3 = await prioritiseTasks(cleaningTasksWard3);

//   const allTasks = [...prioritisedListOfTasks1, ...prioritisedListOfTasks2, ...prioritisedListOfTasks3];

//   return { allTasks, bedNumber, wardNumber };
// };

// const handleTerminalCleaning = async (patientMRN, bedNumber, wardNumber) => {

//   const modifiedCleaningTask = await createTerminalCleaningTask(bedNumber, wardNumber);
  
//   // assign to floating cleaner
//   // get floating cleaner name
//   //add it to task

//   const cleaningTasksWard1 = await getTasksByWardNumber(1);
//   const cleaningTasksWard2 = await getTasksByWardNumber(2);
//   const cleaningTasksWard3 = await getTasksByWardNumber(3);

//   const prioritisedListOfTasks1 = await prioritiseTasks(cleaningTasksWard1);
//   const prioritisedListOfTasks2 = await prioritiseTasks(cleaningTasksWard2);
//   const prioritisedListOfTasks3 = await prioritiseTasks(cleaningTasksWard3);

//   const allTasks = [...prioritisedListOfTasks1, ...prioritisedListOfTasks2, ...prioritisedListOfTasks3];

//   return { allTasks, bedNumber, wardNumber };
// };


const createNewLabResultCleaningTasks = async (patientMRN, wardBed, wardNumber) => {

  console.log(`Creating cleaning task for new lab result`);
  const specialCleaning = await checkCleaningType(patientMRN);

  let task = null;

  if (!specialCleaning.specialisedCleaning && specialCleaning.validResults === null)
  {
    task = await createRoutineTask(true, wardBed, wardNumber);
  }
  else if (specialCleaning.specialisedCleaning && specialCleaning.validResults !== null && specialCleaning.validResults.length === 1)
  {
    let pathID = specialCleaning.validResults[0].pathogen_id;
    task = await createSpecialisedTask(true, pathID, wardBed, wardNumber);
  }
  else if (specialCleaning.specialisedCleaning && specialCleaning.validResults !== null && specialCleaning.validResults.length !== 1)
    {
      task = await createMultiplePosResultsCleaningTask(true, specialCleaning.validResults, wardBed, wardNumber);
    }

  const modifiedTask = await modifyTask(
    task.protocol_name,
    task.cleaning_agent,
    task.preparation,
    task.adjunct,
    task.mask,
    task.clothing,
    task.gloves,
    task.eye_protection,
    task.hand_hygiene,
    task.single_use,
    task.stream,
    task.staff_first_name,
    task.date_created,
    task.time_created,
    task.notes,
    task.staff_last_name,
    task.last_updated_date,
    task.last_updated_time,
    task.time_to_complete,
    task.complete,
    wardNumber,
    wardBed
  );

  console.log(task);
  return task;
};

const createTerminalCleaningTask = async (wardBed, wardNumber) => {

  // get patients mrn from lab data using wardbed and wardnumber
  // should return 2 things
  let patientMRN;
  const results = await getPatientMRNByWardAndBedNumber(wardNumber, wardBed);
  
  if (results.length > 1) {
    const latest = results.reduce((prev, current) => {
      return new Date(current.timestamp) > new Date(prev.timestamp) ? current : prev;
    });
    patientMRN = latest.mrn;
  } else {
    patientMRN = results.mrn;
  }

  console.log(`Creating terminal cleaning task`);
  const specialCleaning = await checkCleaningType(patientMRN);

  let task = null;

  if (!specialCleaning.specialisedCleaning && specialCleaning.validResults === null)
  {
    task = await createRoutineTask(false, wardBed, wardNumber);
  }
  else if (specialCleaning.specialisedCleaning && specialCleaning.validResults !== null && specialCleaning.validResults.length === 1)
  {
    let pathID = specialCleaning.validResults[0].pathogen_id;
    task = await createSpecialisedTask(false, pathID, wardBed, wardNumber);
  }
  else if (specialCleaning.specialisedCleaning && specialCleaning.validResults !== null && specialCleaning.validResults.length !== 1)
    {
      task = await createMultiplePosResultsCleaningTask(false, specialCleaning.validResults, wardBed, wardNumber);
    }

  const modifiedTask = await modifyTask(
    task.protocol_name,
    task.cleaning_agent,
    task.preparation,
    task.adjunct,
    task.mask,
    task.clothing,
    task.gloves,
    task.eye_protection,
    task.hand_hygiene,
    task.single_use,
    task.stream,
    task.staff_first_name,
    task.date_created,
    task.time_created,
    task.notes,
    task.staff_last_name,
    task.last_updated_date,
    task.last_updated_time,
    task.time_to_complete,
    task.complete,
    wardNumber,
    wardBed
  );

  console.log(task);
  return task;
};

const createDailyCleaningTasksByWard = async (wardBeds, wardNumber) => {

  const tasks = await Promise.all(
    wardBeds.map(async (bed) => {

      const patientMRN = bed.patient_mrn;
      const specialCleaning = await checkCleaningType(patientMRN);
      let task = null;

      if (!specialCleaning.specialisedCleaning && specialCleaning.validResults === null)
      {
        task = await createRoutineTask(true, bed.bed_number, wardNumber);
      }
      else if (specialCleaning.specialisedCleaning && specialCleaning.validResults !== null && specialCleaning.validResults.length === 1)
      {
        let pathID = specialCleaning.validResults[0].pathogen_id;
        task = await createSpecialisedTask(true, pathID, bed.bed_number, wardNumber);
      }
      else if (specialCleaning.specialisedCleaning && specialCleaning.validResults !== null && specialCleaning.validResults.length !== 1)
      {
        task = await createMultiplePosResultsCleaningTask(true, specialCleaning.validResults, bed.bed_number, wardNumber);
      }

      return task; 
    })
  );

  const newTasks = tasks.filter((task) => task !== null);

  if (newTasks.length > 0) {
    await Promise.all(
      newTasks.map(async (task) => {
        await insertTask(
          task.protocol_name,
          task.cleaning_agent,
          task.preparation,
          task.adjunct,
          task.mask,
          task.clothing,
          task.gloves,
          task.eye_protection,
          task.hand_hygiene,
          task.single_use,
          task.stream,
          task.ward_number,
          task.bed_number,
          task.staff_first_name,
          task.date_created,
          task.time_created,
          task.notes,
          task.staff_last_name,
          task.last_updated_date,
          task.last_updated_time,
          task.time_to_complete,
          task.complete
        );
      })
    );
  }

  return newTasks;
};


module.exports = { createTerminalCleaningTask, createDailyCleaningTasksByWard, createPrioritisedListOfTasks, handleStaffTaskAssignment, createNewLabResultCleaningTasks }