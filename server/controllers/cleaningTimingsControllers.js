const cleaningTimingsService = require('../services/cleaningTimingsServices');

async function fetchDailyRoutineTimings(req, res) {
    try {
        const timing = await cleaningTimingsService.getDailyRoutineTimings();
        res.status(200).json(timing);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily routine timings:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily routine timings' });  // Handle errors
    }
}

async function fetchTerminalRoutineTimings(req, res) {
    try {
        const timing = await cleaningTimingsService.getTerminalRoutineTimings();
        res.status(200).json(timing);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching terminal routine timings:', err.message);
        res.status(500).json({ error: 'Failed to fetch terminal routine timings' });  // Handle errors
    }
}

async function fetchDailySpecialisedTimings(req, res) {
    try {
        const timing = await cleaningTimingsService.getDailySpecialisedTimings();
        res.status(200).json(timing);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching daily specialised timings:', err.message);
        res.status(500).json({ error: 'Failed to fetch daily specialised timings' });  // Handle errors
    }
}

async function fetchTerminalSpecialisedTimings(req, res) {
    try {
        const timing = await cleaningTimingsService.getTerminalSpecialisedTimings();
        res.status(200).json(timing);  // Send the result as a JSON response
    } catch (err) {
        console.error('Error fetching terminal specialised timings:', err.message);
        res.status(500).json({ error: 'Failed to fetch terminal specialised timings' });  // Handle errors
    }
}

module.exports = { fetchDailyRoutineTimings, fetchDailySpecialisedTimings, fetchTerminalRoutineTimings, fetchTerminalSpecialisedTimings }