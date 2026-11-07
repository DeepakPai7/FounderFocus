
"use client";

import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard";
import Sidebar from "../../components/Sidebar";
import { getTopPriorities } from "../../utils/prioritization";

export default function Priorities() {
    const { tasks } = useContext(TaskContext);

    const topPriorities = getTopPriorities(tasks);

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

                            <h3>Priority Score: {task.priorityScore}</h3>

                            <TaskCard task={task} />

                            <div className="priority-reason">
                                <strong>Why did FounderFocus select this task?</strong>
                                <p>{task.priorityReason}</p>
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
