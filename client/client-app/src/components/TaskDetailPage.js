import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access route parameters
import TasksAPI from '../api/tasksApi';
import { Link } from "react-router-dom";

const TaskDetailPage = () => {
  const { taskId } = useParams(); // Get the taskId from the URL
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskDetails = await TasksAPI.getTasksById(taskId);
        setTask(taskDetails); // Assume it returns a single task object
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    
    fetchTaskDetails();
  }, [taskId]);

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div>
      <h2>Task Details for Task ID: {task.id}</h2>
      <p>Ward Number: {task.ward_number}</p>
      <p>Bed Number: {task.bed_number}</p>
      <p>Task: {task.cleaning_agent}</p>
      <p>Protocol: {task.protocol_name}</p>
      <p>Preparation: {task.preparation}</p>
      <p>Adjunct: {task.adjunct}</p>
      <p>Mask: {task.mask}</p>
      <p>Gloves: {task.gloves}</p>
      <p>Eye Protection: {task.eye_protection}</p>
      <p>Hand Hygiene: {task.hand_hygiene}</p>
      <p>Single Use: {task.single_use}</p>
      <p>Stream: {task.stream}</p>
      <p>Task End Time: {task.task_end_time}</p>

      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default TaskDetailPage;
