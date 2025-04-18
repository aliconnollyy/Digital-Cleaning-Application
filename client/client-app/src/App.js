import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client"; 
import TasksAPI from './api/tasksApi';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import TaskTable from './components/tableComponent';
import './App.css';

const socket = io("http://localhost:5000");

const MyComponent = () => {
  const [staffAssignments, setStaffAssignments] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [dueSoonTasks, setDueSoonTasks] = useState([]);
  const [unableToCompleteTasks, setUnableToCompleteTasks] = useState([]);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false); // State for loading state
  const [error, setError] = useState(null); // State for error handling
  const [missedCleaningTasks, setMissedCleaningTasks] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const alertInterval = setInterval(() => {
      if (unableToCompleteTasks.length > 0) {
        alert(
          `Outstanding incomplete tasks:\n` +
            unableToCompleteTasks
              .map((task) => `Ward: ${task.ward_number} Bed: ${task.bedNumber}`)
              .join("\n")
        );
      }
    }, 60 * 1000);
  
    return () => clearInterval(alertInterval);
  }, [unableToCompleteTasks]); 
  
  useEffect(() => {
    const handleNewTaskUpdate = (data) => {
      console.log("Received WebSocket update:", data);

      const { bed_number, ward_number, staff_first_name, staff_last_name } = data;

      setStaffAssignments((prevAssignments) => {
        return prevAssignments.map((staff) => {
          // Filter out the task that needs to be removed
          const updatedTasks = staff.tasks.filter(
            (task) => !(task.ward_number === ward_number && task.bed_number === bed_number)
          );
  
          // Return the updated staff member with the remaining tasks
          return { ...staff, tasks: updatedTasks };
        });
      });

      alert(`Task in ward: ${ward_number} bed: ${bed_number} updated and reassigned`);
    };

    socket.on("new task update", handleNewTaskUpdate);

    return () => {
      socket.off("new task update", handleNewTaskUpdate);
    };
  }, []);

  useEffect(() => {
 
    const allTasks = staffAssignments.flatMap(staff => staff.tasks);

    setTaskList(allTasks);

    const intervalId = setInterval(() => {
      handleOverdueTasks(allTasks);
      handleDueSoonTasks(allTasks);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [staffAssignments]);


  const handleOverdueTasks = (tasks) => {
    const overdue = tasks.filter((task) => isTaskOverdue(task.task_end_time, task.complete));

    if (overdue.length > 0) {
      setOverdueTasks(overdue);
    }
  }

  const handleDueSoonTasks = (tasks) => {
    const dueSoon = tasks.filter((task) => isTaskDueSoon(task.task_end_time, task.complete, 2));

    if (dueSoon.length > 0) {
      setDueSoonTasks(dueSoon);
    }
  }

  const isTaskDueSoon = (taskEndTime, taskComplete, hoursThreshold) => {
    if (taskComplete) return false; // If task is already complete, it's not due soon

    const [taskHours, taskMinutes] = taskEndTime.split(':').map(Number);

    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    // Convert task time and current time to total minutes since start of the day
    const taskTotalMinutes = taskHours * 60 + taskMinutes;
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    // Check if the task is within the next 'hoursThreshold' hours
    return taskTotalMinutes > currentTotalMinutes && taskTotalMinutes <= currentTotalMinutes + hoursThreshold * 60;
};

const isTaskOverdue = (taskEndTime, taskComplete) => {
  // Extract hours and minutes from task_end_time (HH:mm:ss format)
  const [taskHours, taskMinutes] = taskEndTime.split(':').map(Number);

  // Get current time's hours and minutes
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // Compare task time with current time
  if (taskHours < currentHours || (taskHours === currentHours && taskMinutes < currentMinutes)) {

    // check if complete
    if(!taskComplete) {
      return true;
    }
    return false;
  }
  return false; 
};

  const fetchStaffAssignments = async () => {
    
    setLoading(true);

    try {

      const response = await TasksAPI.getAssignedTasks();
      if(response) {
        setStaffAssignments(response);

        await fetchTasksForStaff(response);
      } else {
        setError("Invalid data structure received.");
      }

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day
      const yesterdayDate = currentDate.toISOString().split('T')[0];

      await getMissedCleaning("2025-04-17", "no");
    } 
    catch (error) {
      setError("Failed to fetch staff assignments");
      console.error("Error fetching staff assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasksForStaff = async (staffAssignments) => {

    try {
      const allTaskIds = staffAssignments.flatMap(staff => staff.tasks);
      
      const taskDetails = await Promise.all(allTaskIds.map(async (id) => {
        const tasks = await TasksAPI.getTasksById(id);
        return tasks;
      }));
      
      const taskLoopUp = taskDetails.flat().reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
      });

      const updatedAssignments = staffAssignments.map(staff => ({
        ...staff,
        tasks: staff.tasks.map(taskId => taskLoopUp[taskId] || null).filter(task => task !== null)      
      }));
      
      setStaffAssignments(updatedAssignments);
      
    } catch (error) {
      console.error("Error fetching task details");
    }
  };
  
  const handleNoteChange = (wardNumber, bedNumber, value) => {
    const key = `${wardNumber}-${bedNumber}`; // Create a unique key based on ward and bed numbers
    
    setNotes((prevNotes) => ({
      ...prevNotes,
      [key]: value,  // Update notes using the combined key
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  const handleComplete = async (taskId, ward_number, bed_number) => {
    try {
      await TasksAPI.insertComplete("yes", ward_number, bed_number);

      setUnableToCompleteTasks((prevTasks) =>
        prevTasks.filter(
          (task) => !(task.ward_number === ward_number && task.bed_number === bed_number)
        )
      );

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      const formattedTime = currentDate.toTimeString().split(' ')[0];
  
      await TasksAPI.insertCleaningLogEntry(taskId, formattedDate, formattedTime, "yes");

      const allTasks = staffAssignments.flatMap(staff => staff.tasks);
      handleOverdueTasks(allTasks);
    } catch (error) {
      console.error(`Error completing task ${taskId} on ward: ${ward_number} bed: ${bed_number}`, error);
    }
  };

  const handleIncompleteTasksEndOfDay = async () => {
    if (unableToCompleteTasks.length > 0) {
      for (const task of unableToCompleteTasks) {
        try {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split('T')[0];
          const formattedTime = currentDate.toTimeString().split(' ')[0];
  
          await TasksAPI.insertCleaningLogEntry(task.task_id, formattedDate, formattedTime, "no");
        } catch (error) {
          console.error(`Error logging incomplete task (ID: ${task.task_id}):`, error);
        }
      }
      setUnableToCompleteTasks([]);

    }
  };  

  const handleSubmitNote = async (note, ward_number, bed_number) => {

    try {
      await TasksAPI.insertNote(note, ward_number, bed_number);
      console.log(`Added note to task on ward: ${ward_number} bed: ${bed_number}!`);
    } catch (error) {
      console.error(`Error adding note to task on ward: ${ward_number} bed: ${bed_number}`, error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleUnableToComplete = async (task_id, wardNumber, bedNumber) => {

    setUnableToCompleteTasks((prevTasks) => [
      ...prevTasks,
      { wardNumber, bedNumber, task_id },
    ]);

    alert(`Unable to complete task in ward: ${wardNumber} bed: ${bedNumber}. Re-attempt in 2 hours!`)
  };

  const getMissedCleaning = async (date, complete) => {
    try {
      const unfinishedCleaning = await TasksAPI.getMissedCleaning(date, complete);
      const taskIds = unfinishedCleaning.map(task => task.task_id);

      // Fetch all missed task details concurrently
      const missedTasksList = await Promise.all(
        taskIds.map(async (id) => {
          const task = await TasksAPI.getTasksById(id);
          return task; // assuming getTasksById returns task object
        })
      );

      setMissedCleaningTasks(missedTasksList.flat());

    } catch (error) {
      console.error("Error fetching missed cleaning tasks", error);
    }
  };

  // const getPreviousDayTaskNotes = async(date_created, ward_number, bed_number) => {
  //   const notes = await TasksAPI.getPreviousDayTaskNotes(date_created, ward_number, bed_number);
  //   return notes;
  // }


  return (
    <div style={{ backgroundColor: '#ECECEC', minHeight: '100vh', padding: '20px' }}>
      <h1 align="center">Staff Cleaning Dashboard</h1>
      <div>
      <div className="unfinished-tasks-box">
        <h2>Unfinished Tasks:</h2>
        {missedCleaningTasks.length > 0 ? (
          <ul>
          {missedCleaningTasks.map((task) => (
            <li key={task.task_id}>
              Ward: {task.ward_number} Bed: {task.bed_number}
            </li>
          ))}
        </ul>        
        ) : (
          <p>No unfinished tasks from yesterday!</p>
        )}
      </div>
      </div>
      <div>
      {staffAssignments.length > 0 ? (
        staffAssignments.map((staff) => (     
          <div key={staff.staffId} style={{ marginBottom: "40px" }}>          
            <TaskTable
              wardName={staff.staffName}  
              tasks={staff.tasks}
              notes={notes}               
              onNoteChange={handleNoteChange}
              onSubmitNote={handleSubmitNote} 
              onComplete={handleComplete}
              unableToCompleteTasks = {unableToCompleteTasks}
              onUnableToComplete = {handleUnableToComplete}
              overdueTasks = {overdueTasks}
              dueSoonTasks = {dueSoonTasks}
            />
          </div>     
        ))
      ) : (
        <p>No staff assignments available.</p>
      )}
      </div>
      <button onClick={fetchStaffAssignments}>Refresh Staff Assignments</button>
      <button
        className="button button-unable"
        onClick={handleIncompleteTasksEndOfDay}
      >
        Log incomplete tasks at EOD
      </button>
    </div>
  );  
};  

export default MyComponent;