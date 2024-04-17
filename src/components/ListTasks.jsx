import { React, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-hot-toast";

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

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let tasksToMap = todos;
  let bg = "";

  if (status === "inprogress") {
    text = "In Progress";
    bg = "green";
    tasksToMap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    bg = "red";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("Task status changed");
      return mTasks;
    });
  };

  return (
    <>
      <div ref={drop}>
        <Header
          text={text}
          count={tasksToMap.length} /* backgroundColor={background color }*/
          bg={bg}
        />
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
      </div>
    </>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <>
      <div style={{ backgroundColor: bg }}>
        <div>{text}</div>
        <div>{count}</div>
      </div>
    </>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    console.log(id);
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task Removed");
  };
  return (
    <>
      <div ref={drag}>
        <p>{task.name}</p>
        <button onClick={() => handleRemove(task.id)}>Delete Task</button>
      </div>
    </>
  );
};
