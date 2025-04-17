const { getStaffSchedules } = require('../services/staffService');
const { insertScheduleInfo } = require('../services/tasksServices');

let globalTaskIndex = 0;

const scheduleDailyCleaningStaff = async (allTasks, staffMember) => {

  let incompleteTask = null; // This will hold any task that couldn't be completed
  let taskIds = [];

  let remainingTimeHours = staffMember.shift_length;
  let remainingTimeMinutes = remainingTimeHours * 60;
  let currentTime = staffMember.start_time;
  //console.log(currentTime);

  // If there's an incomplete task, assign it as the first task
  if (incompleteTask) {
    incompleteTask = null; // Clear the incomplete task
  }

  // While there are still tasks left and they have time left on their shift
  while (globalTaskIndex < allTasks.length) {
    // Get the current task
    let task = allTasks[globalTaskIndex];
    //console.log(`Task: ${task}`)
    // Parse current time into hours, minutes, and seconds
    let [hours, minutes, seconds] = currentTime.split(':').map(Number);
    // Extract minutes to add from the task string
    let minutesToAdd = parseInt(task.time_to_complete);  // Extracting "40" from "40 minutes"
    // If the remaining time is less than the time required for the task, save it as incomplete
    if (remainingTimeMinutes < minutesToAdd) {
      //console.log(`Not enough time to complete task ${task.id}, saving it for the next staff member.`);
      incompleteTask = task;
      globalTaskIndex++; // Move to the next task
      break; // Stop processing tasks for this staff member
    }
    // Add the minutes to the current time
    minutes += minutesToAdd;
    // Adjust for overflow in minutes and hours
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);  // Add the extra hour(s)
      minutes = minutes % 60;  // Get the remainder for minutes
    }
    if (hours >= 24) {
      hours = hours % 24;  // Keep hours within a 24-hour format
    }
    // Format the resulting time back to "HH:MM:SS"
    let taskEndTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    let newScheduleInfo = await insertScheduleInfo(staffMember.id, staffMember.first_name, staffMember.last_name, taskEndTime, task.id);
    // Update the current time and remaining time for the staff member
    currentTime = taskEndTime;
    remainingTimeMinutes -= minutesToAdd;
    taskIds.push(task.id);
    globalTaskIndex++;
  }

    // // If no tasks are left or not enough time, log a message
    // if (remainingTimeMinutes > 0) {
    //   console.log(`Staff member ${staffMember.id} has completed their shift with ${remainingTimeMinutes} minutes remaining.`);
    // } else {
    //   console.log(`Staff member ${staffMember.id} has completed their shift.`);
    // }

  // // If there are any remaining tasks, log them
  // if (incompleteTask) {
  //   console.log(`Task ${incompleteTask.id} remains incomplete at the end of the schedule.`);
  // }
  return taskIds;
};

module.exports = { scheduleDailyCleaningStaff };
