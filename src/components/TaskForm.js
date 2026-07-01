import React, { useState, useEffect } from "react";

const TaskForm = ({
                      task,
                      projects = [],
                      onSubmit,
                      onCancel,
                  }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "",
        projectId: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || "",
                description: task.description || "",
                status: task.status || "TODO",
                priority: task.priority || "MEDIUM",
                dueDate: task.dueDate || "",
                projectId: task.projectId || "",
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            onSubmit(formData);
        } catch (err) {
            setError("Failed to save task.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{task ? "Edit Task" : "Create New Task"}</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
            />

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="TODO">Todo</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>

            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>

            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
            />

            <select
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
            >
                <option value="">No Project</option>

                {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>

            <div className="form-actions">
                <button type="submit" className="control-button">
                    {task ? "Save Changes" : "Create Task"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="control-button"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TaskForm;