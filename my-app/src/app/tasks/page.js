
"use client";

import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard";
import Sidebar from "../../components/Sidebar";

export default function Tasks() {
    const { tasks, setTasks } = useContext(TaskContext);

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskPriority, setTaskPriority] = useState("Medium");

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editPriority, setEditPriority] = useState("Medium");

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || task.status === statusFilter;

        const matchesPriority =
            priorityFilter === "All" ||
            (task.priority || "Medium") === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    // Add a new task
    function handleAddTask() {
        if (!taskTitle.trim() || !taskDate) return;

        const newTask = {
            id: Date.now(),
            title: taskTitle.trim(),
            date: taskDate,
            priority: taskPriority,
            status: "Pending"
        };

        setTasks([...tasks, newTask]);

        setTaskTitle("");
        setTaskDate("");
        setTaskPriority("Medium");
    }

    // Complete a task
    function handleCompleteTask(id) {
        setTasks(tasks.map((task) =>
            task.id === id
                ? { ...task, status: "Completed" }
                : task
        ));
    }

    // Delete a task
    function handleDeleteTask(id) {
        setTasks(tasks.filter((task) => task.id !== id));

        if (editingId === id) {
            setEditingId(null);
        }
    }

    // Start editing
    function handleEditTask(task) {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDate(task.date);
        setEditPriority(task.priority || "Medium");
    }

    // Save changes
    function handleSaveEdit(id) {
        if (!editTitle.trim() || !editDate) return;

        setTasks(tasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    title: editTitle.trim(),
                    date: editDate,
                    priority: editPriority
                }
                : task
        ));

        setEditingId(null);
    }

    // Postpone by one day
    function handlePostponeTask(id) {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                const newDate = new Date(task.date + "T00:00:00");
                newDate.setDate(newDate.getDate() + 1);

                const updatedDate = [
                    newDate.getFullYear(),
                    String(newDate.getMonth() + 1).padStart(2, "0"),
                    String(newDate.getDate()).padStart(2, "0")
                ].join("-");

                return { ...task, date: updatedDate };
            }

            return task;
        }));
    }

    return (
        <main>
            <Sidebar />

            <section>
                <h1>My Tasks</h1>
                <p>Manage your startup tasks here.</p>

                {/* Add Task */}
                <div className="add-task">
                    <h2>Add a New Task</h2>

                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />

                    <input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                    />

                    <select
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>

                    <button onClick={handleAddTask}>
                        Add Task
                    </button>
                </div>

                {/* Task List */}
                <div className="upcoming-tasks">
                    <h2>All Tasks</h2>

                    {/* Search and Filters */}
                    <div className="task-filters">

                        <input
                            type="text"
                            placeholder="Search tasks by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="All">All Priorities</option>
                            <option value="High">High Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="Low">Low Priority</option>
                        </select>

                    </div>

                    <p>
                        Showing {filteredTasks.length} of {tasks.length} tasks
                    </p>

                    {tasks.length === 0 && (
                        <p>No tasks yet. Add your first task!</p>
                    )}

                    {tasks.length > 0 && filteredTasks.length === 0 && (
                        <p>No matching tasks found. Try changing your search or filters.</p>
                    )}

                    {filteredTasks.map((task) => (
                        <div key={task.id} className="task">

                            {editingId === task.id ? (
                                <div className="edit-task-form">

                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                    />

                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) =>
                                            setEditDate(e.target.value)
                                        }
                                    />

                                    <select
                                        value={editPriority}
                                        onChange={(e) =>
                                            setEditPriority(e.target.value)
                                        }
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>

                                    <button onClick={() =>
                                        handleSaveEdit(task.id)
                                    }>
                                        Save
                                    </button>

                                    <button onClick={() =>
                                        setEditingId(null)
                                    }>
                                        Cancel
                                    </button>

                                </div>
                            ) : (
                                <>
                                    <TaskCard task={task} />

                                    <div className="task-actions">

                                        {task.status !== "Completed" && (
                                            <>
                                                <button onClick={() =>
                                                    handleCompleteTask(task.id)
                                                }>
                                                    Complete
                                                </button>

                                                <button onClick={() =>
                                                    handlePostponeTask(task.id)
                                                }>
                                                    Postpone +1 Day
                                                </button>
                                            </>
                                        )}

                                        <button onClick={() =>
                                            handleEditTask(task)
                                        }>
                                            Edit
                                        </button>

                                        <button onClick={() =>
                                            handleDeleteTask(task.id)
                                        }>
                                            Delete
                                        </button>

                                    </div>
                                </>
                            )}

                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
