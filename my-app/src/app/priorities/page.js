
"use client";

import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard";
import Sidebar from "../../components/Sidebar";

export default function Priorities() {
    const { tasks } = useContext(TaskContext);

    const today = new Date();

    const todayDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3
    };

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

    function getPriorityReason(task, index) {
        const priority = task.priority || "Medium";

        if (task.date < todayDate) {
            return "This task is overdue and needs immediate attention.";
        }

        if (index === 0) {
            return priority === "High"
                ? "This task ranks first because it has High importance."
                : `This task ranks first because it has the highest available importance (${priority}) and earliest deadline.`;
        }

        const previousTask = topPriorities[index - 1];
        const previousPriority = previousTask.priority || "Medium";

        if (priorityOrder[priority] > priorityOrder[previousPriority]) {
            return `This task ranks below a ${previousPriority}-priority task because it has lower importance.`;
        }

        if (priorityOrder[priority] === priorityOrder[previousPriority]) {
            return "This task has the same importance as the task above, but its deadline is later.";
        }

        return "This task is ranked according to its importance and deadline.";
    }

    return (
        <main>
            <Sidebar />

            <section>
                <h1>Today's Top 3 Priorities</h1>

                <p>
                    Focus on the tasks that matter most to your startup.
                </p>

                <div>
                    {topPriorities.map((task, index) => (
                        <div className="priority-card" key={task.id}>
                            <h2>Priority #{index + 1}</h2>

                            <TaskCard task={task} />

                            <div className="priority-reason">
                                <strong>Why is this task ranked here?</strong>
                                <p>{getPriorityReason(task, index)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {topPriorities.length === 0 && (
                    <p>No pending tasks. Great work!</p>
                )}
            </section>
        </main>
    );
}
