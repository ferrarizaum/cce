import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Card from "../components/Card";
import Box from "../components/Box";

const Home = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Card />;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Card></Card>
      <Box>{isDropped ? draggableMarkup : "Drop here"}</Box>
    </DndContext>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === "box") {
      setIsDropped(true);
    }
  }
};

export default Home;
