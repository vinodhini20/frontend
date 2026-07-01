import React from "react";
import { deleteTask } from "../api";

const TaskList = ({ tasks, onEdit, onDelete }) => {

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(id);
                onDelete(); // Refresh the list
            } catch (error) {
                console.error("Error deleting task:", error);
                alert("Failed to delete task.");
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className="task-card">
                    <h3>{task.title}</h3>

                    <p>{task.description}</p>

                    <div className="task-meta">
                        <span>Status: {task.status}</span>
                        <span className={`priority-${task.priority}`}>
              Priority: {task.priority}
            </span>
                    </div>

                    <div className="task-meta">
                        <span>Due: {formatDate(task.dueDate)}</span>
                        <span>
              Project: {task.project ? task.project.name : "None"}
            </span>
                    </div>

                    <div className="task-actions">
                        <button onClick={() => onEdit(task)}>
                            Edit
                        </button>

                        <button onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;