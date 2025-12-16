# Backspot

**Reveal the hidden friction in your workflow.**

> Built for **Codegeist 2025** on Atlassian Forge.

Backspot acts as a silent observer in your Jira project, analyzing the hidden history of issues to detect patterns of inefficiency that standard dashboards miss. It doesn't just tell you _what_ is happening—it tells you _why_ work feels so hard.

![Backspot Demo](https://via.placeholder.com/800x400.png?text=Place+Screenshot+Here)

## 🛑 The Problem

Traditional metrics (Velocity, Cycle Time) are lagging indicators. They show you the result of the problem, not the cause. Teams struggle with:

- **Invisible Rework**: Tickets bouncing between "In Progress" and "To Do".
- **Assignee Ping-Pong**: Issues getting hot-potatoed between developers.
- **Silent Delays**: Work sitting idle in active columns.

## 💡 The Solution

Backspot provides real-time, non-judgmental signals directly inside Jira.

### 1. Issue Insight Panel

Sits on the issue view and scans the changelog to visualize the timeline of friction.

- **Rework Loops**: Detects circular status transitions (e.g., A -> B -> A).
- **Assignee Churn**: Highlights excessive handoffs.
- **Friction Score**: A single number (0-10) indicating the "drag" on this issue.

### 2. Project Pulse

A project-level overview that identifies systemic bottlenecks.

- **Aggregate Health**: See the average friction score of your sprint.
- **Bottleneck Detection**: Identify which part of your workflow causes the most rework.

## ⚙️ How it Works

Backspot runs entirely on **Atlassian Forge**, ensuring your data never leaves your Jira Cloud instance. It uses a heuristic algorithm to calculate a **Friction Score**:

```javascript
Score =
  Reopens * 2.0 +
  Loops * 1.5 +
  Backtracks * 1.0 +
  AssigneeChanges * 0.5 +
  IdleDays * 0.1;
```

| Score   | Interpretation | Action               |
| ------- | -------------- | -------------------- |
| **0-2** | Smooth         | No action needed.    |
| **3-5** | Friction       | Discuss in standup.  |
| **6+**  | blocked        | Retrospective topic. |

## 🛠️ Installation & Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/backspot.git
    cd backspot
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Deploy to Jira**:
    ```bash
    forge deploy
    forge install
    ```

## 🏗️ Architecture

Backspot is built with a modular "Service-Resolver" pattern:

- **`src/services/`**: Core logic for analyzing issues and projects.
- **`src/utils/`**: Algorithms for loop detection and time tracking.
- **`src/frontend/`**: Native Forge UI Kit components (`IssuePanel`, `ProjectPage`).

## 🏆 Codegeist 2025

- **Originality**: Moves beyond descriptive analytics to behavioral pattern matching.
- **Privacy**: Zero data egress. No external AI services.
- **Utility**: Solves the universal pain of "Estimate Drift" and "Zombie Tickets".
