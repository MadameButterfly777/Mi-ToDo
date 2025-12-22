
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length)
    return <p className="has-text-centered has-text-grey-light mt-5">No hay estrellas que marcar aún...</p>;

  return (
    <div>
      {tasks.map((task, i) => (
        <TaskItem
          key={i}
          task={task}
          index={i}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
