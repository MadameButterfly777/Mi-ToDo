import React, { useState } from "react";

export default function TaskItem({ task, index, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onEdit(index, text);
    setEditing(false);
  };

  return (
    <div className="box has-background-black-bis has-text-light is-flex is-align-items-center is-justify-content-center"
  style={{ borderRadius: 8, width: "100%" }}>
      {editing ? (
        <form onSubmit={handleEditSubmit} className="is-flex is-flex-grow-1">
          <input
            className="input is-small is-flex-grow-1 mr-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            aria-label="Editar tarea"
          />
          <button type="submit" className="button is-success is-small mr-2" aria-label="Guardar edición">
            <i className="fa-solid fa-check" />
          </button>
          <button type="button" className="button is-light is-small" onClick={() => setEditing(false)} aria-label="Cancelar edición">
            <i className="fa-solid fa-xmark" />
          </button>
        </form>
      ) : (
        <>
          <p
            className={`is-size-5 ${task.completed ? "has-text-grey-light" : "has-text-white"}`}
            style={{ cursor: "pointer", flexGrow: 1, marginRight: 12, textDecoration: task.completed ? "line-through 2px" : "none" }}
            onClick={() => onToggle(index)}
            aria-label={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onToggle(index); }}
          >
            {task.text}
          </p>

          <div className="buttons" style={{ margin: 0 }}>
            <button
              className="button is-success is-small"
              onClick={() => onToggle(index)}
              aria-label={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
              title={task.completed ? "Desmarcar" : "Marcar completada"}
            >
              <i className={`fa-solid fa-check ${task.completed ? "" : ""}`} />
            </button>

            <button
              className="button is-info is-small"
              onClick={() => setEditing(true)}
              aria-label="Editar tarea"
              title="Editar"
            >
              <i className="fa-solid fa-pen" />
            </button>

            <button
              className="button is-danger is-small"
              onClick={() => onDelete(index)}
              aria-label="Borrar tarea"
              title="Borrar"
            >
              <i className="fa-solid fa-trash" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
