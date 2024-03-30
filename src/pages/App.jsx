import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "../components/Droppable";
import { Draggable } from "../components/Draggable";

const salas = [
  { numero: "a321", lotacao: 30 },
  { numero: "a220", lotacao: 40 },
  { numero: "a231", lotacao: 45 },
  { numero: "a235", lotacao: 50 },
  { numero: "p231", lotacao: 25 },
];

const turmas = [
  { numero: "n14", lotacao: 30 },
  { numero: "n19", lotacao: 30 },
  { numero: "n18", lotacao: 30 },
  { numero: "n17", lotacao: 15 },
  { numero: "n16", lotacao: 50 },
];

function App() {
  const [salaTurmas, setSalaTurmas] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const turmaNumero = active.id;
    const salaNumero = over.id;

    const turma = turmas.find((t) => t.numero === turmaNumero);
    const sala = salas.find((s) => s.numero === salaNumero);

    if (turma.lotacao > sala.lotacao) {
      setErrorMessage(
        `The turma ${turmaNumero} has a bigger lotacao than the sala ${salaNumero}.`
      );
      return;
    }

    setSalaTurmas((prev) => ({
      ...prev,
      [salaNumero]: [turmaNumero],
    }));

    setErrorMessage("");
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <DndContext onDragEnd={handleDragEnd}>
        <div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          {turmas.map((turma) => (
            <Draggable
              key={turma.numero}
              id={turma.numero}
              lotacao={turma.lotacao}
            />
          ))}
        </div>
        <div>
          {salas.map((sala) => (
            <Droppable
              key={sala.numero}
              id={sala.numero}
              lotacao={sala.lotacao}
            >
              {salaTurmas[sala.numero]?.map((turmaNumero) => (
                <div key={turmaNumero}>{turmaNumero}</div>
              ))}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
