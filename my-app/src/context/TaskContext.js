
"use client";

import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

const initialTasks = [
    {
        id: 1,
        title: "Complete project research",
        date: "2026-11-03",
        status: "Pending"
    },
    {
        id: 2,
        title: "Prepare project wireframe",
        date: "2026-11-04",
        status: "Pending"
    },
    {
        id: 3,
        title: "Discuss MVP features",
        date: "2026-11-05",
        status: "Completed"
    }
];

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(initialTasks);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved tasks when the app starts
    useEffect(() => {
        const savedTasks = localStorage.getItem("founderfocus-tasks");

        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch {
                setTasks(initialTasks);
            }
        }

        setIsLoaded(true);
    }, []);

    // Save tasks whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(
                "founderfocus-tasks",
                JSON.stringify(tasks)
            );
        }
    }, [tasks, isLoaded]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
}
