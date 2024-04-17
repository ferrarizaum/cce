import React from "react";
import { useDrag } from "react-dnd";
import { toast } from "react-hot-toast";

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task Removed");
  };
  return (
    <>
      <div className="task" ref={drag}>
        <div>
          <p>{task.name}</p>
        </div>
        <div>
          <button
            className="button-delete"
            onClick={() => handleRemove(task.id)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </>
  );
};

export default Task;
