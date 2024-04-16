import React, { useState } from "react";
import { toast } from "react-hot-toast";

let id = 1;

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", //todo, inprogress, closed
  });

  console.log(task);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      return toast.error("Task must have more than 3 characters");
    }
    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, id: id++, name: e.target.value })}
        />
        <button></button>
      </form>
    </>
  );
};

export default CreateTask;
