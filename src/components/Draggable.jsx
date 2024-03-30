import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        // Add display flex
        width: "150px",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: "gray", // Add background color gray
      }
    : {
        // Add display flex
        width: "150px",
        backgroundColor: "gray", // Add background color gray
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div>
        <p>Turma: {props.id}</p>
      </div>
      <div>
        <p>Lotacao: {props.lotacao}</p>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
