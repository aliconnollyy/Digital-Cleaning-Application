import React, { useState, useEffect } from "react";
import "./table.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';


const TaskTable = ({ wardName, tasks, notes, onNoteChange, onSubmitNote, onComplete, unableToCompleteTasks, onUnableToComplete, overdueTasks, dueSoonTasks }) => {
  const [completedTasks, setCompletedTasks] = useState({});
  const [savedNotes, setSavedNotes] = useState({});
  const [taskList, setTaskList] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    if (tasks.length > 0) {     
      setTaskList(tasks);
    }
  }, [tasks]);  

  const handleCompleteClick = (taskId, ward_number, bed_number) => {
    const key = `${ward_number}-${bed_number}`;

    setCompletedTasks((prev) => ({
      ...prev,
      [key]: true,
    }));

    // Move task to the bottom while keeping its completed state
    setTaskList((prevTasks) => {
      const taskIndex = prevTasks.findIndex(
        (task) => task.ward_number === ward_number && task.bed_number === bed_number
      );

      if (taskIndex === -1) return prevTasks;

      const completedTask = { ...prevTasks[taskIndex] };
      const remainingTasks = prevTasks.filter((_, i) => i !== taskIndex);

      return [...remainingTasks, completedTask];
    });

    onComplete(taskId, ward_number, bed_number);
  };

  const handleUnableToCompleteClick = (ward_number, bed_number, task_id) => {
    onUnableToComplete(ward_number, bed_number, task_id);
  };

  const handleNoteSavedClick = (ward_number, bed_number) => {
    const key = `${ward_number}-${bed_number}`;

    setSavedNotes((prev) => ({
      ...prev,
      [key]: true,
    }));

    onSubmitNote(notes[key] || "", ward_number, bed_number);
  };

  return (
    <div className="task-table-container">
      <h2>{wardName}</h2>
      {taskList.length > 0 ? (
        <table border="1" className="full-table">
          <thead>
            <tr>
              <th>Ward</th>
              <th>Bed</th>
              <th>Task</th>
              <th>Complete By</th>
              <th>Notes</th>
              <th>Completed</th>
              <th>Cant Complete</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => {
              const key = `${task.ward_number}-${task.bed_number}`;
              const isUnableToComplete = unableToCompleteTasks.some(
                (t) => t.wardNumber === task.ward_number && t.bedNumber === task.bed_number
              );

              return (
                <tr key={index}>
                  <td>{task.ward_number}</td>
                  <td>{task.bed_number}</td>
                  <td
                    style={{
                      backgroundColor:
                        completedTasks[key]
                          ? 'transparent' // If completed, no background change
                          : overdueTasks.some((overdueTask) => overdueTask.id === task.id)
                          ? 'red' // Overdue task
                          : dueSoonTasks.some((dueSoonTask) => dueSoonTask.id === task.id)
                          ? 'orange' // Due soon task
                          : 'white', // Default background
                    }}
                  >
                    <span className="clickable-task" onClick={() => setSelectedTask(task)}>
                      {task.cleaning_agent}
                    </span>
                    {/* <Tooltip
                      title={
                        <div>
                          {/* <div>Pathogen Present: {task.protocol_name}</div> */}
                          {/* <div>Cleaning Agent: {task.cleaning_agent}</div> */}
                          {/* <div>Preparation: {task.preparation}</div> */}
                          {/* <div>Adjunct: {task.adjunct}</div> */}
                          {/* <div>Mask: {task.mask}</div> */}
                          {/* <div>Clothing: {task.clothing}</div> */}
                          {/* <div>Gloves: {task.gloves}</div> */}
                          {/* <div>Eye Protection: {task.eye_protection}</div> */}
                          {/* <div>Hand hygiene: {task.hand_hygiene}</div> */}
                          {/* <div>Single use: {task.single_use}</div> */}
                          {/* <div>Stream: {task.stream}</div> */}
                        {/* </div> */}
                      {/* } */}
                      {/* arrow */}
                    {/* > */}
                      {/* <span> */}
                        {/* <InfoOutlinedIcon style={{ cursor: 'pointer', marginLeft: '5px' }} /> */}
                      {/* </span> */}
                    {/* </Tooltip>  */}
                  </td>
                  <td>{task.task_end_time}</td>
                  <td>
                    <input
                      type="text"
                      value={notes[key] || ""}
                      onChange={(e) => onNoteChange(task.ward_number, task.bed_number, e.target.value)}
                      placeholder="Enter notes..."
                    />
                    <button
                      className={`button button-save ${savedNotes[key] ? 'saved' : ''}`}
                      onClick={() => handleNoteSavedClick(task.ward_number, task.bed_number)}
                    >
                      Save Note
                    </button>
                  </td>
                  <td>
                    <button
                      className={`button button-complete ${completedTasks[key] ? 'completed' : ''}`}
                      onClick={() => handleCompleteClick(task.id, task.ward_number, task.bed_number)}
                    >
                      Complete
                    </button>
                  </td>
                  <td>
                    <button
                      className={`button button-unable ${isUnableToComplete ? 'unable' : ''}`}
                      onClick={() => handleUnableToCompleteClick(task.id, task.ward_number, task.bed_number)}
                    >
                      Can't Complete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No prioritised tasks available.</p>
      )}
      {selectedTask && (
      <div className="task-instructions-modal">
        <div className="modal-content">
          <h3>Cleaning Instructions</h3>
          <ul>
            {/* <li><strong>Pathogen Present:</strong> {selectedTask.protocol_name}</li> */}
            <li><strong>Preparation:</strong> {selectedTask.preparation}</li>
            <li><strong>Adjunct:</strong> {selectedTask.adjunct}</li>
            <li><strong>Mask:</strong> {selectedTask.mask}</li>
            <li><strong>Clothing:</strong> {selectedTask.clothing}</li>
            <li><strong>Gloves:</strong> {selectedTask.gloves}</li>
            <li><strong>Eye Protection:</strong> {selectedTask.eye_protection}</li>
            <li><strong>Hand hygiene:</strong> {selectedTask.hand_hygiene}</li>
            <li><strong>Single use:</strong> {selectedTask.single_use}</li>
            <li><strong>Stream:</strong> {selectedTask.stream}</li>
          </ul>
          <button onClick={() => setSelectedTask(null)}>Close</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default TaskTable;