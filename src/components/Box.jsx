import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Box = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "box",
  });
  const style = {
    color: isOver ? "green" : undefined,
    width: "150px",
    height: "150px",
    backgroundColor: "gray",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div style={{ display: "flex" }}>
        <p>Container</p>
      </div>
      <div style={{ display: "flex" }}>
        <p>Task: {props.children}</p>
      </div>
    </div>
  );
};

export default Box;
