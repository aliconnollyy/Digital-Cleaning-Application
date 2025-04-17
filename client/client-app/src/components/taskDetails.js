import React from "react";
import { useLocation } from "react-router-dom";

const TaskDetails = () => {
  const location = useLocation();
  const task = location.state?.task || {}; // Retrieve task from state
  
  if (!task.id) {
    return <p>Task not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Details</h2>
      <p><strong>Pathogen Present:</strong> {task.protocol_name}</p>
      <p><strong>Cleaning Agent:</strong> {task.cleaning_agent}</p>
      <p><strong>Preparation:</strong> {task.preparation}</p>
      <p><strong>Adjunct:</strong> {task.adjunct}</p>
      <p><strong>Mask:</strong> {task.mask}</p>
      <p><strong>Clothing:</strong> {task.clothing}</p>
      <p><strong>Gloves:</strong> {task.gloves}</p>
      <p><strong>Eye Protection:</strong> {task.eye_protection}</p>
      <p><strong>Hand hygiene:</strong> {task.hand_hygiene}</p>
      <p><strong>Single use:</strong> {task.single_use}</p>
      <p><strong>Stream:</strong> {task.stream}</p>
    </div>
  );
};

export default TaskDetails;
