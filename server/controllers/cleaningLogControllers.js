const cleaningLogService = require("../services/cleaningLogService");

async function createCleaningLogEntry(req, res) {
    try {
        const { taskId, date, time, complete } = req.body; // Extract values from request body

        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required" });
        }

        const newLog = await cleaningLogService.createCleaningLogEntry(taskId, date, time, complete);
        res.status(201).json(newLog);
    } catch (err) {
        console.error("Error creating cleaning log:", err.message);
        res.status(500).json({ error: "Failed to create cleaning log" });
    }
}

async function fetchLastCleanInfo(req, res) {
    try {
        const ward_number = req.params.ward_number;
        const bed_number = req.params.bed_number;
        const lastClean= await cleaningLogService.getLastCleanInfo(ward_number, bed_number);
        res.status(200).json(lastClean);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching last clean info:', err.message);
        res.status(500).json({ error: 'Failed to fetch last clean info' });  // Handle errors
    }
}

async function fetchMissedCleaning(req, res) {
    try {
        const date = req.params.date;
        const complete = req.params.complete;

        const missedCleaning = await cleaningLogService.getMissedCleaning(date, complete);
        res.status(200).json(missedCleaning);
    } catch (err) {
        console.error('Error fetching missed cleaning:', err.message);
        throw new Error('Failed to fetch missing cleaning');
    }
}

module.exports = { createCleaningLogEntry, fetchLastCleanInfo, fetchMissedCleaning };
