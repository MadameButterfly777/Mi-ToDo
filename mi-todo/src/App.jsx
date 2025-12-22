import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // modal para borrar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  //  modal  para editar
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = (text) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const toggleTask = (i) => {
    const t = [...tasks];
    t[i].completed = !t[i].completed;
    setTasks(t);
  };

  // --- Borrar ---
  const deleteTask = (i) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  const askDeleteTask = (i) => {
    setTaskToDelete(i);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = () => {
    deleteTask(taskToDelete);
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  // --- Editar ---
  const askEditTask = (i, text) => {
    setTaskToEdit(i);
    setEditText(text);
    setShowEditModal(true);
  };

  const confirmEditTask = () => {
    if (!editText.trim()) return;
    const t = [...tasks];
    t[taskToEdit].text = editText;
    setTasks(t);
    setShowEditModal(false);
    setTaskToEdit(null);
    setEditText("");
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
              onDelete={askDeleteTask}  
              onEdit={askEditTask}       
            />
          </div>

        </div>
      </div>

      {/*  aca borro */}
      {showDeleteModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowDeleteModal(false)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Eliminar tarea</p>
              <button className="delete" onClick={() => setShowDeleteModal(false)}></button>
            </header>
            <section className="modal-card-body">
              ¿Seguro que querés borrar esta tarea?
            </section>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={confirmDeleteTask}>
                Eliminar
              </button>
              <button className="button" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* aca edito */}
      {showEditModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowEditModal(false)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Editar tarea</p>
              <button className="delete" onClick={() => setShowEditModal(false)}></button>
            </header>
            <section className="modal-card-body">
              <input
                className="input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={confirmEditTask}>
                Guardar
              </button>
              <button className="button" onClick={() => setShowEditModal(false)}>
                Cancelar
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}
