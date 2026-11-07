
"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import Sidebar from "../../components/Sidebar";
import { getTopPriorities } from "../../utils/prioritization";

export default function Dashboard() {
    const { tasks, setTasks } = useContext(TaskContext);

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");

    // Today's date
    const today = new Date();

    const todayDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    // Shared prioritization engine
    const topPriorities = getTopPriorities(tasks);

    // Add a new task
    function handleAddTask() {
        if (!taskTitle.trim() || !taskDate) return;

        const newTask = {
            id: Date.now(),
            title: taskTitle.trim(),
            date: taskDate,
            priority: "Medium",
            impact: "Medium",
            estimatedEffort: "1 hour",
            deadlineType: "Flexible",
            status: "Pending",
            goalId: null,
            postponedCount: 0,
            lastPostponedDate: null,
            completedAt: null
        };

        setTasks([...tasks, newTask]);

        setTaskTitle("");
        setTaskDate("");
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
    }

    // Dashboard statistics
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const overdueTasks = tasks.filter(
        (task) =>
            task.date < todayDate &&
            task.status !== "Completed"
    ).length;

    return (
        <main>
            <Sidebar />

            <section>
                <h1>Hello, Founder!</h1>
                <p>Your startup journey starts here.</p>

                {/* Overview Cards */}
                <div className="container">
                    <div className="card">
                        <h1>{totalTasks}</h1>
                        <p>Total Tasks</p>
                    </div>

                    <div className="card">
                        <h1>{completedTasks}</h1>
                        <p>Completed</p>
                    </div>

                    <div className="card">
                        <h1>{pendingTasks}</h1>
                        <p>Pending</p>
                    </div>

                    <div className="card">
                        <h1>{overdueTasks}</h1>
                        <p>Overdue</p>
                    </div>
                </div>

                {/* Smart Top 3 Priorities */}
                <div className="priorities">
                    <h2>Today's Top 3 Priorities</h2>

                    {topPriorities.map((task, index) => (
                        <div className="priority-card" key={task.id}>
                            <h3>
                                {index + 1}. {task.title}
                            </h3>

                            <p>
                                Priority Score: <strong>{task.priorityScore}</strong>
                            </p>

                            <p>Deadline: {task.date}</p>

                            <p>Business Impact: {task.impact || "Medium"}</p>

                            <p>Estimated Effort: {task.estimatedEffort || "1 hour"}</p>

                            <p>Deadline Type: {task.deadlineType || "Flexible"}</p>

                            <p>
                                <strong>Why selected:</strong>{" "}
                                {task.priorityReason}
                            </p>
                        </div>
                    ))}

                    {topPriorities.length === 0 && (
                        <p>No pending priorities. Great work!</p>
                    )}

                    <Link href="/priorities">
                        View all priorities
                    </Link>
                </div>

                {/* Add Task */}
                <div className="add-task">
                    <h2>Add a New Task</h2>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddTask();
                    }}>
                        <input
                            type="text"
                            placeholder="Enter task name"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                        />

                        <input
                            type="date"
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            required
                        />

                        <button type="submit">Add Task</button>
                    </form>

                    <p>
                        Tasks added here receive Medium impact,
                        1-hour effort and a Flexible deadline by default.
                        You can edit these details under My Tasks.
                    </p>
                </div>

                {/* Upcoming Tasks */}
                <div className="upcoming-tasks">
                    <h2>Upcoming Tasks</h2>

                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <h3>Your workspace is empty!</h3>
                            <p>
                                You haven't added any tasks yet.
                                Add your first task to get started.
                            </p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div className="task" key={task.id}>
                                <div>
                                    <h3>{task.title}</h3>
                                    <p>Due: {task.date}</p>
                                    <p>Priority: {task.priority || "Medium"}</p>
                                    <p>Impact: {task.impact || "Medium"}</p>
                                </div>

                                <span>{task.status}</span>

                                {task.status !== "Completed" && (
                                    <button onClick={() =>
                                        handleCompleteTask(task.id)
                                    }>
                                        Complete
                                    </button>
                                )}

                                <button onClick={() =>
                                    handleDeleteTask(task.id)
                                }>
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
