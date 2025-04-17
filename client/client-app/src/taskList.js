import React from "react";
import ReactTooltip from 'react-tooltip'; 

const TaskList = ({ tasks }) => {
  return (
    <ul style={{ paddingLeft: "20px", listStyleType: "none" }}>
      {tasks.map((task, index) => (
        <li key={index}>
          <strong>Bed {task.bedNumber}:</strong> {task.protocolName}
          <span
            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            data-tip
            data-for={`task-tooltip-${index}`}
          >
            <br />
            Details
          </span>
          <ReactTooltip
            id={`task-tooltip-${index}`}
            place="top"
            type="dark"
            effect="solid"
          >
            <div>
              <strong>Cleaning Agent: </strong> {task?.cleaningAgent} <br />
              <strong>Preparation: </strong> {task?.preparation} <br />
              <strong>Adjunct: </strong> {task?.adjunct} <br />
              <strong>Mask: </strong> {task?.mask} <br />
              <strong>Clothing: </strong> {task?.clothing} <br />
              <strong>Gloves: </strong> {task?.gloves} <br />
              <strong>Eye Protection: </strong> {task?.eyeProtection} <br />
              <strong>Hand Wash: </strong> {task?.handHygiene} <br />
              <strong>Single-use Waste? </strong> {task?.singleUse} <br />
              <strong>Waste Stream: </strong> {task?.stream} <br />
            </div>
          </ReactTooltip>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
