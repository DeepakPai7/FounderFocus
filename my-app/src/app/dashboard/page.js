
"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
    const { tasks, setTasks } = useContext(TaskContext);

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");

    // Get today's date
    const today = new Date();

    const todayDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    // Priority ranking
    const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3
    };

    // Calculate top 3 priorities
    const topPriorities = [...tasks]
        .filter((task) => task.status !== "Completed")
        .sort((a, b) => {
            const priorityA = priorityOrder[a.priority || "Medium"];
            const priorityB = priorityOrder[b.priority || "Medium"];

            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            return a.date.localeCompare(b.date);
        })
        .slice(0, 3);

    // Explain why each task was selected
    function getPriorityReason(task, index) {
        const priority = task.priority || "Medium";

        if (task.date < todayDate) {
            return "This task is overdue and needs attention.";
        }

        if (index === 0) {
            return priority === "High"
                ? "Ranked first because it has High importance."
                : "Ranked first because it has the highest available importance and earliest deadline.";
        }

        const previousTask = topPriorities[index - 1];
        const previousPriority = previousTask.priority || "Medium";

        if (priorityOrder[priority] > priorityOrder[previousPriority]) {
            return `Ranked after a ${previousPriority}-priority task because this task has lower importance.`;
        }

        return "Ranked after another task of the same importance because its deadline is later.";
    }

    // Add a new task
    function handleAddTask() {
        if (!taskTitle.trim() || !taskDate) return;

        const newTask = {
            id: Date.now(),
            title: taskTitle.trim(),
            date: taskDate,
            priority: "Medium",
            status: "Pending"
        };

        setTasks([...tasks, newTask]);

        setTaskTitle("");
        setTaskDate("");
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
    }

    // Dashboard statistics
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    // Find overdue tasks
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

                            <p>Deadline: {task.date}</p>

                            <p>
                                Importance: {task.priority || "Medium"}
                            </p>

                            <p>
                                Why selected: {getPriorityReason(task, index)}
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

                    <p>Tasks added here receive Medium priority by default.</p>
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
