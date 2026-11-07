
"use client";

import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function TaskCard({ task }) {
    const { goals } = useContext(TaskContext);

    const priority = task.priority || "Medium";
    const impact = task.impact || "Medium";
    const effort = task.estimatedEffort || "1 hour";
    const deadlineType = task.deadlineType || "Flexible";
    const postponedCount = task.postponedCount || 0;

    const linkedGoal = goals.find(
        (goal) => goal.id === task.goalId
    );

    return (
        <div className="task-card">
            <h3>{task.title}</h3>

            <p>Deadline: {task.date}</p>

            <p>
                Priority: <strong>{priority}</strong>
            </p>

            <p>
                Business Impact: <strong>{impact}</strong>
            </p>

            <p>
                Estimated Effort: <strong>{effort}</strong>
            </p>

            <p>
                Deadline Type: <strong>{deadlineType}</strong>
            </p>

            <p>
                Business Goal:{" "}
                <strong>
                    {linkedGoal ? linkedGoal.title : "Not linked"}
                </strong>
            </p>

            <p>Status: {task.status}</p>

            {postponedCount > 0 && (
                <div>
                    <p>
                        <strong>
                            Postponed {postponedCount}{" "}
                            {postponedCount === 1 ? "time" : "times"}
                        </strong>
                    </p>

                    <p>
                        Last postponed: {task.lastPostponedDate || "Date unavailable"}
                    </p>
                </div>
            )}
        </div>
    );
}
