import React, { useState, useEffect, useCallback } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, getProjects } from './api';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [filters, setFilters] = useState({
        page: 0,
        size: 10,
        sort: 'dueDate,asc',
        status: '',
        priority: '',
    });

    const [totalPages, setTotalPages] = useState(0);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await getTasks(filters);
            setTasks(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, [filters]);

    const fetchProjects = async () => {
        try {
            const response = await getProjects();
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchProjects();
    }, [fetchTasks]);

    const handleTaskSaved = () => {
        fetchTasks();
        setEditingTask(null);
        setIsFormVisible(false);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setEditingTask(null);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setEditingTask(null);
        setIsFormVisible(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 0,
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage,
        }));
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>TASK_TRACKER_</h1>
                <div className="header-glow"></div>
            </header>

            <main className="app-main">
                <div className="controls-container">
                    <button
                        onClick={handleAddNew}
                        className="control-button add-new-button"
                    >
                        + Add New Task
                    </button>

                    <div className="filters">
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="filter-select"
                        >
                            <option value="">All Statuses</option>
                            <option value="TODO">Todo</option>
                            <option value="DOING">Doing</option>
                            <option value="DONE">Done</option>
                        </select>

                        <select
                            name="priority"
                            value={filters.priority}
                            onChange={handleFilterChange}
                            className="filter-select"
                        >
                            <option value="">All Priorities</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>

                        <select
                            name="sort"
                            value={filters.sort}
                            onChange={handleFilterChange}
                            className="filter-select"
                        >
                            <option value="dueDate,asc">
                                Sort by Due Date (Asc)
                            </option>
                            <option value="dueDate,desc">
                                Sort by Due Date (Desc)
                            </option>
                        </select>
                    </div>
                </div>

                {isFormVisible && (
                    <TaskForm
                        task={editingTask}
                        projects={projects}
                        onSave={handleTaskSaved}
                        onCancel={handleCancel}
                    />
                )}

                <TaskList
                    tasks={tasks}
                    onEdit={handleEdit}
                    onDelete={fetchTasks}
                />

                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 0}
                    >
                        &lt; PREV
                    </button>

                    <span>
            PAGE {filters.page + 1} OF {totalPages}
          </span>

                    <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page >= totalPages - 1}
                    >
                        NEXT &gt;
                    </button>
                </div>
            </main>

            <footer className="app-footer">
                <p>// SYSTEM_STATUS: ONLINE //</p>
            </footer>
        </div>
    );
}

export default App;