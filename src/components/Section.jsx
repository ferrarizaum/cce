import React from "react";
import { useDrop } from "react-dnd";
import { toast } from "react-hot-toast";
import Header from "./Header";
import Task from "./Task";

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
  let bg = "gray";

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

export default Section;
