import React, { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input is-medium"
            type="text"
            placeholder="Susurrá tu tarea..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="button is-primary is-medium">
            <span className="icon">+
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
