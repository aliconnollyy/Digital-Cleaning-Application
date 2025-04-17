/// should we add 'notes' on tasks to actual task or cleaning log?

const { getLastCleanInfo } = require('../services/cleaningLogService');

const prioritiseTasks = async (tasksInWard) => {

  let routineTasks = [];
  let specialisedTasks = [];
  let multiplePathogenTasks = [];

  tasksInWard.forEach((task) => {

    if (task.protocol_name === "Routine Cleaning") {
      routineTasks.push(task);
    } else if (task.protocol_name === "Multiple Pathogens") {
      multiplePathogenTasks.push(task);
    } else {
      specialisedTasks.push(task);
    }    
  });

  const calculateTimeElapsed = (lastCleanInfo) => {

    if (!lastCleanInfo || lastCleanInfo.length === 0) return Infinity;

    // Extract date and time from last clean info
    const lastCleanDate = new Date(`${lastCleanInfo[0].log_date_completed}T${lastCleanInfo[0].log_time_completed}`);
    const currentTime = new Date();

    // Calculate time difference in minutes
    const timeDifference = Math.abs(currentTime - lastCleanDate) / (1000 * 60); // Time in minutes
    return timeDifference;
  };

  const prioritisedListOfRoutineTasks = await Promise.all(
    routineTasks.map(async (task) => {
      const lastCleanInfo = await getLastCleanInfo(task.ward_number, task.bed_number);
      const timeElapsedSinceBedWasCleaned = calculateTimeElapsed(lastCleanInfo);
      return {...task, timeElapsedSinceBedWasCleaned };
    })
  );

  const prioritisedListOfSpecialisedTasks = await Promise.all(
    specialisedTasks.map(async (task) => {
      const lastCleanInfo = await getLastCleanInfo(task.ward_number, task.bed_number);
      const timeElapsedSinceBedWasCleaned = calculateTimeElapsed(lastCleanInfo);
      return {...task, timeElapsedSinceBedWasCleaned };
    })
  );

  const prioritisedListOfMultiplePathogenTasks = await Promise.all(
    multiplePathogenTasks.map(async (task) => {
      const lastCleanInfo = await getLastCleanInfo(task.ward_number, task.bed_number);
      const timeElapsedSinceBedWasCleaned = calculateTimeElapsed(lastCleanInfo);
      return {...task, timeElapsedSinceBedWasCleaned };
    })
  );

  const combinedList = [
    ...prioritisedListOfMultiplePathogenTasks,
    ...prioritisedListOfSpecialisedTasks,
    ...prioritisedListOfRoutineTasks,
  ];

  combinedList.sort((a, b) => a.timeElapsedSinceBedWasCleaned - b.timeElapsedSinceBedWasCleaned);
  return combinedList;
};

module.exports = { prioritiseTasks }
