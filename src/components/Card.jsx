import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Card = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "card",
  });
  const style = transform
    ? {
        display: "flex",
        width: "150px",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {
        display: "flex",
        width: "150px",
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div style={{ display: "flex" }}>
        <p>Task 1</p>
      </div>
      <div style={{ display: "flex" }}>{props.children}</div>
    </div>
  );
};

export default Card;
