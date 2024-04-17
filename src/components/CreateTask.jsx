import React, { useState } from "react";
import { toast } from "react-hot-toast";

let id = 1;

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", //todo, inprogress, closed
  });

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
      <div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <input
                type="text"
                value={task.name}
                onChange={(e) =>
                  setTask({ ...task, id: id++, name: e.target.value })
                }
              />
            </div>
            <div>
              <button>Create Task</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
