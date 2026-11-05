
"use client";

import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import Sidebar from "../../components/Sidebar";

export default function Progress() {

    const { tasks } = useContext(TaskContext);

    // Get today's date and upcoming 7-day period
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextSevenDays = new Date(today);
    nextSevenDays.setDate(today.getDate() + 7);
    nextSevenDays.setHours(0, 0, 0, 0);

    // Select tasks due within the upcoming 7 days
    const weeklyTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date + "T00:00:00");

        return taskDate >= today && taskDate < nextSevenDays;
    });

    const completedTasks = weeklyTasks.filter(
        (task) => task.status === "Completed"
    );

    const pendingTasks = weeklyTasks.filter(
        (task) => task.status !== "Completed"
    );

    const completionRate = weeklyTasks.length === 0
        ? 0
        : Math.round(
            (completedTasks.length / weeklyTasks.length) * 100
        );

    return (
        <main>
            <Sidebar />

            <section className="progress-page">

                <div className="progress-header">
                    <h1>Weekly Progress</h1>
                    <p>Track your progress over the next 7 days.</p>
                </div>

                {/* Summary Cards */}
                <div className="progress-stats">

                    <div className="progress-stat-card">
                        <span>Total Tasks</span>
                        <h2>{weeklyTasks.length}</h2>
                    </div>

                    <div className="progress-stat-card">
                        <span>Completed</span>
                        <h2>{completedTasks.length}</h2>
                    </div>

                    <div className="progress-stat-card">
                        <span>Pending</span>
                        <h2>{pendingTasks.length}</h2>
                    </div>

                </div>

                {/* Completion Overview */}
                <div className="completion-card">

                    <div className="completion-heading">
                        <div>
                            <h2>Weekly Completion</h2>
                            <p>Your task completion rate</p>
                        </div>

                        <h1>{completionRate}%</h1>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{ width: `${completionRate}%` }}
                        ></div>
                    </div>

                    <p className="progress-message">
                        {weeklyTasks.length === 0
                            ? "No tasks scheduled for the next 7 days."
                            : `${completedTasks.length} out of ${weeklyTasks.length} tasks completed.`}
                    </p>

                </div>

                {/* Task Breakdown */}
                <div className="weekly-task-section">

                    <h2>Upcoming 7-Day Tasks</h2>

                    {weeklyTasks.length === 0 && (
                        <p className="empty-progress">
                            No tasks due in the next 7 days.
                        </p>
                    )}

                    {weeklyTasks.map((task) => (
                        <div className="weekly-task-card" key={task.id}>

                            <div>
                                <h3>{task.title}</h3>
                                <p>Deadline: {task.date}</p>
                            </div>

                            <span className={
                                task.status === "Completed"
                                    ? "status-completed"
                                    : "status-pending"
                            }>
                                {task.status}
                            </span>

                        </div>
                    ))}

                </div>

            </section>
        </main>
    );
}
