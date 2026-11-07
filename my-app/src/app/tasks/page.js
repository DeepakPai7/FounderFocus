
"use client";

import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard";
import Sidebar from "../../components/Sidebar";

export default function Tasks() {
    const { tasks, setTasks, goals } = useContext(TaskContext);

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskPriority, setTaskPriority] = useState("Medium");
    const [taskImpact, setTaskImpact] = useState("Medium");
    const [taskEffort, setTaskEffort] = useState("1 hour");
    const [taskDeadlineType, setTaskDeadlineType] = useState("Flexible");
    const [taskGoalId, setTaskGoalId] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editPriority, setEditPriority] = useState("Medium");
    const [editImpact, setEditImpact] = useState("Medium");
    const [editEffort, setEditEffort] = useState("1 hour");
    const [editDeadlineType, setEditDeadlineType] = useState("Flexible");
    const [editGoalId, setEditGoalId] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

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

    const postponedTasks = tasks.filter(
        (task) => (task.postponedCount || 0) > 0
    );

    // Add a new task
    function handleAddTask() {
        if (!taskTitle.trim() || !taskDate) return;

        const newTask = {
            id: Date.now(),
            title: taskTitle.trim(),
            date: taskDate,
            priority: taskPriority,
            impact: taskImpact,
            estimatedEffort: taskEffort,
            deadlineType: taskDeadlineType,
            goalId: taskGoalId ? Number(taskGoalId) : null,
            status: "Pending",
            postponedCount: 0,
            lastPostponedDate: null,
            completedAt: null
        };

        setTasks([...tasks, newTask]);

        setTaskTitle("");
        setTaskDate("");
        setTaskPriority("Medium");
        setTaskImpact("Medium");
        setTaskEffort("1 hour");
        setTaskDeadlineType("Flexible");
        setTaskGoalId("");
    }

    // Complete a task and record its completion date
    function handleCompleteTask(id) {
        setTasks(tasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    status: "Completed",
                    completedAt: new Date().toISOString()
                }
                : task
        ));
    }

    // Delete a task
    function handleDeleteTask(id) {
        setTasks(tasks.filter((task) => task.id !== id));

        if (editingId === id) {
            cancelEdit();
        }
    }

    // Start editing
    function handleEditTask(task) {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDate(task.date);
        setEditPriority(task.priority || "Medium");
        setEditImpact(task.impact || "Medium");
        setEditEffort(task.estimatedEffort || "1 hour");
        setEditDeadlineType(task.deadlineType || "Flexible");
        setEditGoalId(task.goalId ? String(task.goalId) : "");
    }

    // Save edited task
    function handleSaveEdit(id) {
        if (!editTitle.trim() || !editDate) return;

        setTasks(tasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    title: editTitle.trim(),
                    date: editDate,
                    priority: editPriority,
                    impact: editImpact,
                    estimatedEffort: editEffort,
                    deadlineType: editDeadlineType,
                    goalId: editGoalId ? Number(editGoalId) : null
                }
                : task
        ));

        setEditingId(null);
    }

    // Cancel editing
    function cancelEdit() {
        setEditingId(null);
        setEditTitle("");
        setEditDate("");
        setEditPriority("Medium");
        setEditImpact("Medium");
        setEditEffort("1 hour");
        setEditDeadlineType("Flexible");
        setEditGoalId("");
    }

    // Get today's date
    function getTodayDate() {
        const today = new Date();

        return [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");
    }

    // Postpone a task by one day
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

                return {
                    ...task,
                    date: updatedDate,
                    postponedCount: (task.postponedCount || 0) + 1,
                    lastPostponedDate: getTodayDate()
                };
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

                    <label>Deadline Date</label>
                    <input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                    />

                    <label>Priority</label>
                    <select
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>

                    <label>Business Impact</label>
                    <select
                        value={taskImpact}
                        onChange={(e) => setTaskImpact(e.target.value)}
                    >
                        <option value="High">High Impact</option>
                        <option value="Medium">Medium Impact</option>
                        <option value="Low">Low Impact</option>
                    </select>

                    <label>Estimated Effort</label>
                    <select
                        value={taskEffort}
                        onChange={(e) => setTaskEffort(e.target.value)}
                    >
                        <option value="15 minutes">15 minutes</option>
                        <option value="30 minutes">30 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="2 hours">2 hours</option>
                        <option value="4 hours">4 hours</option>
                    </select>

                    <label>Deadline Type</label>
                    <select
                        value={taskDeadlineType}
                        onChange={(e) => setTaskDeadlineType(e.target.value)}
                    >
                        <option value="Hard">Hard Deadline</option>
                        <option value="Flexible">Flexible Deadline</option>
                    </select>

                    <label>Connect to Business Goal</label>
                    <select
                        value={taskGoalId}
                        onChange={(e) => setTaskGoalId(e.target.value)}
                    >
                        <option value="">No Business Goal</option>
                        {goals.map((goal) => (
                            <option key={goal.id} value={goal.id}>
                                {goal.title}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleAddTask}>
                        Add Task
                    </button>
                </div>

                {/* All Tasks */}
                <div className="upcoming-tasks">
                    <h2>All Tasks</h2>

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
                        <p>
                            No matching tasks found. Try changing your search or filters.
                        </p>
                    )}

                    {filteredTasks.map((task) => (
                        <div key={task.id} className="task">

                            {editingId === task.id ? (
                                <div className="edit-task-form">

                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />

                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                    />

                                    <select
                                        value={editPriority}
                                        onChange={(e) => setEditPriority(e.target.value)}
                                    >
                                        <option value="High">High Priority</option>
                                        <option value="Medium">Medium Priority</option>
                                        <option value="Low">Low Priority</option>
                                    </select>

                                    <select
                                        value={editImpact}
                                        onChange={(e) => setEditImpact(e.target.value)}
                                    >
                                        <option value="High">High Impact</option>
                                        <option value="Medium">Medium Impact</option>
                                        <option value="Low">Low Impact</option>
                                    </select>

                                    <select
                                        value={editEffort}
                                        onChange={(e) => setEditEffort(e.target.value)}
                                    >
                                        <option value="15 minutes">15 minutes</option>
                                        <option value="30 minutes">30 minutes</option>
                                        <option value="1 hour">1 hour</option>
                                        <option value="2 hours">2 hours</option>
                                        <option value="4 hours">4 hours</option>
                                    </select>

                                    <select
                                        value={editDeadlineType}
                                        onChange={(e) => setEditDeadlineType(e.target.value)}
                                    >
                                        <option value="Hard">Hard Deadline</option>
                                        <option value="Flexible">Flexible Deadline</option>
                                    </select>

                                    <label>Business Goal</label>
                                    <select
                                        value={editGoalId}
                                        onChange={(e) => setEditGoalId(e.target.value)}
                                    >
                                        <option value="">No Business Goal</option>
                                        {goals.map((goal) => (
                                            <option key={goal.id} value={goal.id}>
                                                {goal.title}
                                            </option>
                                        ))}
                                    </select>

                                    <button onClick={() => handleSaveEdit(task.id)}>
                                        Save
                                    </button>

                                    <button onClick={cancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <TaskCard task={task} />

                                    <div className="task-actions">

                                        {task.status !== "Completed" && (
                                            <>
                                                <button onClick={() => handleCompleteTask(task.id)}>
                                                    Complete
                                                </button>

                                                <button onClick={() => handlePostponeTask(task.id)}>
                                                    Postpone +1 Day
                                                </button>
                                            </>
                                        )}

                                        <button onClick={() => handleEditTask(task)}>
                                            Edit
                                        </button>

                                        <button onClick={() => handleDeleteTask(task.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Postponed Tasks */}
                <div className="upcoming-tasks">
                    <h2>Postponed Tasks</h2>
                    <p>Tasks that have been delayed at least once.</p>

                    {postponedTasks.length === 0 ? (
                        <p>No postponed tasks. Great work!</p>
                    ) : (
                        <>
                            <p>
                                Total postponed tasks: {postponedTasks.length}
                            </p>

                            {postponedTasks.map((task) => (
                                <div key={task.id} className="task">
                                    <TaskCard task={task} />

                                    <p>
                                        Current deadline: <strong>{task.date}</strong>
                                    </p>

                                    <p>
                                        Postponed{" "}
                                        <strong>
                                            {task.postponedCount}{" "}
                                            {task.postponedCount === 1 ? "time" : "times"}
                                        </strong>
                                    </p>

                                    <p>
                                        Last postponed:{" "}
                                        <strong>
                                            {task.lastPostponedDate || "Date unavailable"}
                                        </strong>
                                    </p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
