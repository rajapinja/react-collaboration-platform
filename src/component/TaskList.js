// TaskList.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

function TaskList({ tasks }) {
  return (
    <Droppable droppableId="task-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
