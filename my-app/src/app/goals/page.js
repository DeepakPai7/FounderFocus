
"use client";

import { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { TaskContext } from "../../context/TaskContext";

export default function GoalsPage() {
    const { goals, setGoals, tasks, setTasks } = useContext(TaskContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [editingGoalId, setEditingGoalId] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a goal title.");
            return;
        }

        if (editingGoalId) {
            setGoals(
                goals.map((goal) =>
                    goal.id === editingGoalId
                        ? {
                            ...goal,
                            title: title.trim(),
                            description: description.trim(),
                            targetDate
                        }
                        : goal
                )
            );

            setEditingGoalId(null);
        } else {
            const newGoal = {
                id: Date.now(),
                title: title.trim(),
                description: description.trim(),
                targetDate,
                status: "Active"
            };

            setGoals([...goals, newGoal]);
        }

        setTitle("");
        setDescription("");
        setTargetDate("");
    }

    function handleEdit(goal) {
        setTitle(goal.title);
        setDescription(goal.description || "");
        setTargetDate(goal.targetDate || "");
        setEditingGoalId(goal.id);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleDelete(goalId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this goal?"
        );

        if (!confirmed) return;

        setGoals(goals.filter((goal) => goal.id !== goalId));

        setTasks(
            tasks.map((task) =>
                task.goalId === goalId
                    ? { ...task, goalId: null }
                    : task
            )
        );

        if (editingGoalId === goalId) {
            cancelEdit();
        }
    }

    function cancelEdit() {
        setTitle("");
        setDescription("");
        setTargetDate("");
        setEditingGoalId(null);
    }

    function getGoalProgress(goalId) {
        const connectedTasks = tasks.filter(
            (task) => task.goalId === goalId
        );

        const completedTasks = connectedTasks.filter(
            (task) => task.status === "Completed"
        );

        const total = connectedTasks.length;
        const completed = completedTasks.length;

        return {
            total,
            completed,
            pending: total - completed,
            percentage:
                total === 0
                    ? 0
                    : Math.round((completed / total) * 100)
        };
    }

    const goalProgress = goals.map((goal) => ({
        ...goal,
        progress: getGoalProgress(goal.id)
    }));

    const completedGoals = goalProgress.filter(
        (goal) =>
            goal.progress.total > 0 &&
            goal.progress.percentage === 100
    ).length;

    const totalConnectedTasks = tasks.filter(
        (task) => task.goalId !== null && task.goalId !== undefined
    ).length;

    return (
        <div className="dashboard-container">
            <Sidebar />

            <main className="main-content goals-page">
                <div className="goals-header">
                    <div>
                        <span className="goals-eyebrow">FOUNDER WORKSPACE</span>
                        <h1>Business Goals</h1>
                        <p>
                            Turn your business vision into measurable outcomes.
                            Connect your daily tasks to what matters most.
                        </p>
                    </div>
                </div>

                <div className="goals-overview">
                    <div className="goal-overview-card">
                        <div className="goal-overview-icon">◎</div>
                        <div>
                            <span>Total Goals</span>
                            <h2>{goals.length}</h2>
                        </div>
                    </div>

                    <div className="goal-overview-card">
                        <div className="goal-overview-icon">✓</div>
                        <div>
                            <span>Goals Completed</span>
                            <h2>{completedGoals}</h2>
                        </div>
                    </div>

                    <div className="goal-overview-card">
                        <div className="goal-overview-icon">↗</div>
                        <div>
                            <span>Connected Tasks</span>
                            <h2>{totalConnectedTasks}</h2>
                        </div>
                    </div>
                </div>

                <div className="goals-layout">
                    <section className="goal-form-panel">
                        <div className="goal-panel-heading">
                            <span className="goal-section-label">
                                {editingGoalId ? "UPDATE YOUR GOAL" : "GET STARTED"}
                            </span>

                            <h2>
                                {editingGoalId ? "Edit Goal" : "Create a Goal"}
                            </h2>

                            <p>
                                Define an important outcome you want to achieve.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="goal-form">
                            <div className="goal-form-field">
                                <label htmlFor="goal-title">Goal Title</label>
                                <input
                                    id="goal-title"
                                    type="text"
                                    placeholder="e.g. Launch the MVP"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="goal-form-field">
                                <label htmlFor="goal-description">
                                    Description
                                </label>
                                <textarea
                                    id="goal-description"
                                    placeholder="Describe what success looks like..."
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    rows="4"
                                />
                            </div>

                            <div className="goal-form-field">
                                <label htmlFor="goal-date">Target Date</label>
                                <input
                                    id="goal-date"
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) =>
                                        setTargetDate(e.target.value)
                                    }
                                />
                            </div>

                            <button type="submit" className="goal-submit-btn">
                                {editingGoalId ? "Save Changes" : "+ Create Goal"}
                            </button>

                            {editingGoalId && (
                                <button
                                    type="button"
                                    className="goal-cancel-btn"
                                    onClick={cancelEdit}
                                >
                                    Cancel Editing
                                </button>
                            )}
                        </form>
                    </section>

                    <section className="goals-list-panel">
                        <div className="goals-list-heading">
                            <div>
                                <span className="goal-section-label">
                                    YOUR OBJECTIVES
                                </span>
                                <h2>Your Goals</h2>
                            </div>

                            <span className="goals-count">
                                {goals.length} {goals.length === 1 ? "Goal" : "Goals"}
                            </span>
                        </div>

                        {goals.length === 0 ? (
                            <div className="goals-empty-state">
                                <div className="goals-empty-icon">◎</div>
                                <h3>No goals created yet</h3>
                                <p>
                                    Start by adding your first business goal.
                                    Your connected tasks and progress will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="goals-list">
                                {goalProgress.map((goal) => (
                                    <article
                                        className="goal-card"
                                        key={goal.id}
                                    >
                                        <div className="goal-card-top">
                                            <div className="goal-card-title">
                                                <h3>{goal.title}</h3>
                                                <span className={
                                                    goal.progress.total > 0 &&
                                                    goal.progress.percentage === 100
                                                        ? "goal-status goal-status-complete"
                                                        : "goal-status"
                                                }>
                                                    {goal.progress.total > 0 &&
                                                    goal.progress.percentage === 100
                                                        ? "Completed"
                                                        : "Active"}
                                                </span>
                                            </div>

                                            <div className="goal-card-actions">
                                                <button
                                                    type="button"
                                                    className="goal-edit-btn"
                                                    onClick={() => handleEdit(goal)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="goal-delete-btn"
                                                    onClick={() =>
                                                        handleDelete(goal.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {goal.description && (
                                            <p className="goal-description">
                                                {goal.description}
                                            </p>
                                        )}

                                        <div className="goal-target-date">
                                            <span>Target date</span>
                                            <strong>
                                                {goal.targetDate
                                                    ? new Date(
                                                        goal.targetDate + "T00:00:00"
                                                    ).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })
                                                    : "Not set"}
                                            </strong>
                                        </div>

                                        <div className="goal-progress-heading">
                                            <span>Overall progress</span>
                                            <strong>
                                                {goal.progress.percentage}%
                                            </strong>
                                        </div>

                                        <div className="goal-progress-track">
                                            <div
                                                className="goal-progress-fill"
                                                style={{
                                                    width: `${goal.progress.percentage}%`
                                                }}
                                            />
                                        </div>

                                        <div className="goal-task-stats">
                                            <span>
                                                <strong>
                                                    {goal.progress.completed}
                                                </strong>{" "}
                                                Completed
                                            </span>

                                            <span>
                                                <strong>
                                                    {goal.progress.pending}
                                                </strong>{" "}
                                                Pending
                                            </span>

                                            <span>
                                                <strong>
                                                    {goal.progress.total}
                                                </strong>{" "}
                                                Total tasks
                                            </span>
                                        </div>

                                        {goal.progress.total === 0 && (
                                            <p className="goal-no-tasks">
                                                No tasks linked yet. Connect tasks
                                                to this goal from the Tasks page.
                                            </p>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
