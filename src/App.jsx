import React, { useEffect, useState } from "react";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import CreateTask from "./components/CreateTask";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  console.log("tasks", tasks);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </DndProvider>
    </>
  );
};

export default App;
