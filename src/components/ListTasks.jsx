import { React, useEffect, useState } from "react";
import Section from "./Section";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "2em",
        }}
      >
        {statuses.map((status, index) => {
          return (
            <Section
              key={index}
              status={status}
              tasks={tasks}
              setTasks={setTasks}
              todos={todos}
              inProgress={inProgress}
              closed={closed}
            ></Section>
          );
        })}
      </div>
    </>
  );
};

export default ListTasks;
