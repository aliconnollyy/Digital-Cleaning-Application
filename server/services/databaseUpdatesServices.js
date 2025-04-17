const databaseUpdatesModel = require('../models/databaseUpdatesModel');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function insertLabResult() {

    let labResult;

    const pathogens = {
        1: 'CPE',
        2: 'MRSA',
        3: 'VRE',
        4: 'Influenza',
        5: 'SARS-CoV-2',
        6: 'C. difficile',
        7: 'LRVRE',
        8: 'MRMRSA',
        9: 'Norovirus'
      };

    try {
        const randomMrn = getRandomNumber(10001, 10106);
        const randomWardNumber = getRandomNumber(1, 3);
        const randomBedNumber = getRandomNumber(1, 35);
        const randomPathogenId = getRandomNumber(1, 9);
        const randomPathogenName = pathogens[randomPathogenId];
        const result = "Positive";

        labResult = await databaseUpdatesModel.insertLabResult(randomMrn, randomWardNumber, randomBedNumber, randomPathogenId, randomPathogenName, result);

        console.log(`Generating positive lab result for patient in ward: ${randomWardNumber} bed: ${randomBedNumber}`)
        
    } catch (err) {
        console.error('Error inserting new lab result:', err.message);
        throw new Error('Failed to insert new lab result');
    }
    return labResult;
}

async function removePatientMRN() {
    try {
        return await databaseUpdatesModel.removePatientMRN();
    } catch (err) {
        console.error('Error removing patient mrn:', err.message);
        throw new Error('Failed to remove patient mrn');
    }
}


module.exports = { insertLabResult, removePatientMRN };