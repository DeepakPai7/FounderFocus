
export default function TaskCard({ task }) {
    const priority = task.priority || "Medium";

    return (
        <div className="task-card">
            <h3>{task.title}</h3>

            <p>Deadline: {task.date}</p>

            <p>
                Priority: <strong>{priority}</strong>
            </p>

            <p>Status: {task.status}</p>
        </div>
    );
}
