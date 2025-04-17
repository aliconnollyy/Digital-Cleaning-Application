const staffService = require('../services/staffService');
const taskAssignment = require('../utils/handleCleaningUtils');

async function fetchStaffSchedules(req, res) {
    try {
        const position = req.params.position;
        const date = req.params.date;
        const shift_type = req.params.shift_type;
        const staffSchedules = await staffService.getStaffSchedules(position, date, shift_type);
        res.status(200).json(staffSchedules);
    } catch (err) {
        console.error('Error fetching staff schedules', err.message);
        res.status(500).json({ error: 'Failed to fetch staff schedules' });
    }
}

async function fetchFloatingStaff(req, res) {
  try {
    const position = req.params.position;
    const shift_type = req.params.shift_type;
    const floating_staff = await staffService.getFloatingStaff(position, shift_type);
    res.status(200).json(floating_staff);
  } catch (err) {
      console.error('Error fetching floating staff', err.message);
      res.status(500).json({ error: 'Failed to fetch floating staff' });
  }
}

async function assignTasksToStaff(req, res) {
  try {
    const assignedTasks = await taskAssignment.handleStaffTaskAssignment();
    res.status(200).json(assignedTasks);
  } catch (error) {
    console.error('Error assigning tasks:', error);
    res.status(500).json({ error: 'Task assignment failed' });
  }
};


module.exports = { fetchStaffSchedules, assignTasksToStaff, fetchFloatingStaff }