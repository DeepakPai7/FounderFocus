
"use client";

import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

const initialTasks = [
    {
        id: 1,
        title: "Complete project research",
        date: "2026-11-03",
        status: "Pending",
        priority: "High",
        impact: "High",
        estimatedEffort: "2 hours",
        deadlineType: "Hard",
        postponedCount: 0,
        lastPostponedDate: null,
        completedAt: null
    },
    {
        id: 2,
        title: "Prepare project wireframe",
        date: "2026-11-04",
        status: "Pending",
        priority: "Medium",
        impact: "High",
        estimatedEffort: "4 hours",
        deadlineType: "Flexible",
        postponedCount: 0,
        lastPostponedDate: null,
        completedAt: null
    },
    {
        id: 3,
        title: "Discuss MVP features",
        date: "2026-11-05",
        status: "Completed",
        priority: "Medium",
        impact: "Medium",
        estimatedEffort: "1 hour",
        deadlineType: "Flexible",
        postponedCount: 0,
        lastPostponedDate: null,
        completedAt: null
    }
];

function normalizeTasks(tasks) {
    return tasks.map((task) => ({
        ...task,
        priority: task.priority || "Medium",
        impact: task.impact || "Medium",
        estimatedEffort: task.estimatedEffort || "1 hour",
        deadlineType: task.deadlineType || "Flexible",
        goalId: task.goalId || null,
        postponedCount: task.postponedCount || 0,
        lastPostponedDate: task.lastPostponedDate || null,
        completedAt: task.completedAt || null
    }));
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(initialTasks);
    const [goals, setGoals] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedTasks = localStorage.getItem("founderfocus-tasks");
        const savedGoals = localStorage.getItem("founderfocus-goals");

        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);

                if (Array.isArray(parsedTasks)) {
                    setTasks(normalizeTasks(parsedTasks));
                }
            } catch {
                setTasks(initialTasks);
            }
        }

        if (savedGoals) {
            try {
                const parsedGoals = JSON.parse(savedGoals);

                if (Array.isArray(parsedGoals)) {
                    setGoals(parsedGoals);
                }
            } catch {
                setGoals([]);
            }
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(
                "founderfocus-tasks",
                JSON.stringify(tasks)
            );
        }
    }, [tasks, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(
                "founderfocus-goals",
                JSON.stringify(goals)
            );
        }
    }, [goals, isLoaded]);

    return (
        <TaskContext.Provider
            value={{ tasks, setTasks, goals, setGoals }}
        >
            {children}
        </TaskContext.Provider>
    );
}
