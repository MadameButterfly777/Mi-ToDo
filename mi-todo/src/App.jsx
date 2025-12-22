import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = (text) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const toggleTask = (i) => {
    const t = [...tasks];
    t[i].completed = !t[i].completed;
    setTasks(t);
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  const editTask = (i, text) => {
    const t = [...tasks];
    t[i].text = text;
    setTasks(t);
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
  <section className="hero is-fullheight ">
    <div className="hero-body is-fullheight">
      <div className="container is-max-desktop has-text-centered">

        <h1 className="title has-text-white is-size-1 mb-6">
          ✦ Mis Tareas con React ✦
        </h1>

        <div className="select is-dark mb-5">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

        <div className="box has-background-black-bis p-5">
          <TaskInput onAdd={addTask} />
        </div>

        <div className="mt-5">
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>

      </div>
    </div>
  </section>
);

}
