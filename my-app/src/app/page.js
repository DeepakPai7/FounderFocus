
import Link from "next/link";

export default function Home() {
    return (
        <main style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "#f8fafc",
            color: "#1e293b"
        }}>

            {/* Navigation */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 8%"
            }}>
                <h2>FounderFocus</h2>

                <Link href="/dashboard">
                    Dashboard
                </Link>
            </nav>

            {/* Hero Section */}
            <section style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "60px 20px"
            }}>
                <h1 style={{
                    fontSize: "48px",
                    maxWidth: "750px"
                }}>
                    Build Your Startup.
                    <br />
                    Focus on What Matters.
                </h1>

                <p style={{
                    fontSize: "18px",
                    color: "#64748b",
                    maxWidth: "600px",
                    lineHeight: "1.7"
                }}>
                    FounderFocus helps student entrepreneurs and
                    startup founders organize tasks, identify priorities,
                    and track their weekly progress.
                </p>

                <Link
                    href="/dashboard"
                    style={{
                        background: "#2563eb",
                        color: "white",
                        padding: "14px 28px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        marginTop: "24px",
                        fontWeight: "bold"
                    }}
                >
                    Get Started
                </Link>
            </section>

            {/* Features */}
            <section style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                flexWrap: "wrap",
                padding: "40px 8%"
            }}>
                <div>
                    <h3>Task Management</h3>
                    <p>Organize and manage your startup tasks.</p>
                </div>

                <div>
                    <h3>Smart Priorities</h3>
                    <p>Identify the three most urgent tasks.</p>
                </div>

                <div>
                    <h3>Weekly Progress</h3>
                    <p>Monitor your work and completion rate.</p>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                textAlign: "center",
                padding: "20px",
                color: "#64748b"
            }}>
                © 2026 FounderFocus. Built for aspiring founders.
            </footer>

        </main>
    );
}
