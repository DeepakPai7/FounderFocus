
const impactPoints = {
    High: 40,
    Medium: 25,
    Low: 10
};

const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
};

const effortPoints = {
    "15 minutes": 10,
    "30 minutes": 8,
    "1 hour": 6,
    "2 hours": 4,
    "4 hours": 2
};

function getTodayDate() {
    const today = new Date();

    return [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
}

function getUrgencyDetails(date, todayDate) {
    if (!date) {
        return { points: 0, reason: "No deadline date" };
    }

    const deadline = new Date(date + "T00:00:00");
    const today = new Date(todayDate + "T00:00:00");

    const daysLeft = Math.round(
        (deadline - today) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
        return { points: 40, reason: "Overdue deadline" };
    }

    if (daysLeft === 0) {
        return { points: 35, reason: "Due today" };
    }

    if (daysLeft <= 2) {
        return { points: 30, reason: "Deadline approaching within 2 days" };
    }

    if (daysLeft <= 7) {
        return { points: 20, reason: "Deadline within 7 days" };
    }

    return { points: 10, reason: "Deadline is more than 7 days away" };
}

function calculateTaskScore(task, todayDate) {
    const impact = task.impact || "Medium";
    const effort = task.estimatedEffort || "1 hour";
    const deadlineType = task.deadlineType || "Flexible";

    const impactScore = impactPoints[impact] ?? 25;
    const urgency = getUrgencyDetails(task.date, todayDate);
    const deadlineScore = deadlineType === "Hard" ? 15 : 0;
    const effortScore = effortPoints[effort] ?? 6;

    const totalScore =
        impactScore +
        urgency.points +
        deadlineScore +
        effortScore;

    const reasons = [
        `${impact} business impact (+${impactScore})`,
        `${urgency.reason} (+${urgency.points})`,
        deadlineType === "Hard"
            ? "Hard deadline (+15)"
            : "Flexible deadline (no extra points)",
        `Estimated effort: ${effort} (+${effortScore})`
    ];

    return {
        totalScore,
        reasons
    };
}

export function getTopPriorities(tasks) {
    const todayDate = getTodayDate();

    return tasks
        .filter((task) => task.status !== "Completed")
        .map((task) => {
            const result = calculateTaskScore(task, todayDate);

            return {
                ...task,
                priorityScore: result.totalScore,
                priorityReason: result.reasons.join(" • ")
            };
        })
        .sort((a, b) => {
            // Highest calculated score comes first
            if (b.priorityScore !== a.priorityScore) {
                return b.priorityScore - a.priorityScore;
            }

            // Manual priority breaks equal-score ties
            const priorityA = priorityOrder[a.priority || "Medium"];
            const priorityB = priorityOrder[b.priority || "Medium"];

            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            // Earlier deadline breaks remaining ties
            return a.date.localeCompare(b.date);
        })
        .slice(0, 3);
}
