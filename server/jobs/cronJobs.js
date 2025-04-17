//// INSERTS A NEW POSITIVE LAB RESULT EVERY MINUTE ////

import cron from "node-cron";
import { insertLabResult, removePatientMRN } from "../services/databaseUpdatesServices.js";

let isProcessingInsert = false;
let isProcessingRemove = false;

console.log("⏳ Cron job scheduler started...");

cron.schedule("* * * * *", async () => {
    if (isProcessingInsert) {
        //console.log("Skipping this run because the last one is still processing...");
        return;
    }

    isProcessingInsert = true;
    //console.log("Running scheduled job: Generating new lab result...");

    try {
        const result = await insertLabResult();
        //console.log("Lab result inserted successfully:", result);
    } catch (err) {
        console.error("Error during insertion:", err.message);
    }

    isProcessingInsert = false;
});

// cron.schedule("* * * * *", async () => {
//     if (isProcessingRemove) {

//         return;
//     }

//     isProcessingRemove = true;

//     try {
//         const result = await removePatientMRN();
//         console.log(result);
//     } catch (err) {
//         console.error("Error removing patient mrn:", err.message);
//     }

//     isProcessingRemove = false;
// });