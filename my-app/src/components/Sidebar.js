import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>FounderFocus</h2>

            <nav>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/tasks">My Tasks</Link>
                <Link href="/goals">Business Goals</Link>
                <Link href="/priorities">Priorities</Link>
                <Link href="/progress">Progress</Link>
            </nav>
        </aside>
    );
}