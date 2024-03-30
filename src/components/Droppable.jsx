import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div
      style={{
        width: "150px",
        height: "90px",
        backgroundColor: isOver ? "green" : "gray",
      }}
      ref={setNodeRef}
    >
      <div>
        <p>Sala: {props.id}</p>
      </div>
      <div>
        <p>Lotacao: {props.lotacao}</p>
      </div>
      <div style={{ display: "flex" }}>Turma: {props.children}</div>
    </div>
  );
}
