const staffModel = require('../models/staffModel');  // Import the model

async function getStaffSchedules(position, date, shift_type) {
    try {
        const staffSchedules = await staffModel.getStaffSchedules(position, date, shift_type);
        return staffSchedules;
    } catch (err) {
        console.error('Error fetching staff schedules', err.message);
        throw new Error('Failed to fetch staff schedules');
    }
}

async function getFloatingStaff(position, shift_type) {
    try {
        const staff = await staffModel.getFloatingStaff(position, shift_type);
        return staff;
    } catch (err) {
        console.error('Error fetching floating staff', err.message);
        throw new Error('Failed to fetch floating staff');
    }
}

module.exports = { getStaffSchedules, getFloatingStaff }