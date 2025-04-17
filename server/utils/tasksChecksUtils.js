const { getPositiveLabResultsByMRN } = require('../services/labDataService');

const checkCleaningType = async (patientMRN) => {

    let validLabResults = [];
    let result;
  
    // Get all positive lab results of a specific patient
    const patientLabResults = await getPositiveLabResultsByMRN(patientMRN);
  
    // Get all VALID positive lab results of a specific patient
    for (let i = 0; i < patientLabResults.length; i++) {
      const positiveResultDate = new Date(patientLabResults[i].timestamp);
      const pID = patientLabResults[i].pathogen_id;
  
      let valid = checkValidityOfLabResult(pID, positiveResultDate);
  
      // Adding all 'valid' (still relevant) positive lab results to new list
      if(valid) {
        validLabResults.push(patientLabResults[i]);
      }
    }
  
    // No positive valid lab results for patient - return specialised cleaning = false
    if (validLabResults.length === 0) {
      result = { specialisedCleaning: false, validResults: null };
      return result;
    }
    // 1 positive valid lab result for patient - return specialised cleaning = true and the pathogenID
    else if (validLabResults.length === 1) {
      result = { specialisedCleaning: true, validResults: validLabResults };
      return result;
    }
    // Multiple positive lab results
    else if (validLabResults.length > 1) {
      result = {specialisedCleaning: true, validResults: validLabResults };
      return result;
    }
};
  
const checkValidityOfLabResult = async (pID, positiveResultDate) => {

  let valid = false;

  if(pID === 4 || pID === 5) {
    const currentDate = new Date();

    // Check if the positive result is within the last 5 days
    const differenceInDays = (currentDate - positiveResultDate) / (1000 * 60 * 60 * 24);

    if (differenceInDays < 5) {
      valid = true;
    }
  } else if (pID === 1 || pID === 2 || pID === 3 || pID === 6 || pID === 7 || pID === 8) {
    valid = true;
  }

  return valid;
};

module.exports = { checkCleaningType, checkValidityOfLabResult }

