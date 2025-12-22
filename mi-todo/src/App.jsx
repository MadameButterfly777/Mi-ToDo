import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // 👉 estados del modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = (text) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const toggleTask = (i) => {
    const t = [...tasks];
    t[i].completed = !t[i].completed;
    setTasks(t);
  };

  // ❌ ya NO se usa directo desde TaskItem
  const deleteTask = (i) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  // ✅ abre el modal
  const askDeleteTask = (i) => {
    setTaskToDelete(i);
    setShowDeleteModal(true);
  };

  // ✅ confirma borrado
  const confirmDeleteTask = () => {
    deleteTask(taskToDelete);
    setShowDeleteModal(false);
    setTaskToDelete(null);
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
    <section className="hero is-fullheight">
      <div className="hero-body">
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
              onDelete={askDeleteTask}   // 🔑 acá está la clave
              onEdit={editTask}
            />
          </div>

        </div>
      </div>

      {/* 🪄 MODAL BULMA */}
      {showDeleteModal && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setShowDeleteModal(false)}
          ></div>

          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Eliminar tarea</p>
              <button
                className="delete"
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </header>

            <section className="modal-card-body">
              ¿Seguro que querés borrar esta tarea?
            </section>

            <footer className="modal-card-foot">
              <button
                className="button is-danger"
                onClick={confirmDeleteTask}
              >
                Eliminar
              </button>
              <button
                className="button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}
