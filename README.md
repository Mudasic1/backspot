# Backspot

**Reveal the hidden friction in your workflow.**

> Built for **Codegeist 2025** on Atlassian Forge.

Backspot acts as a silent observer in your Jira project, analyzing the hidden history of issues to detect patterns of inefficiency that standard dashboards miss. It doesn't just tell you _what_ is happening—it tells you _why_ work feels so hard.

Backspot : (https://developer.atlassian.com/console/install/0e0f92ed-2594-4179-b113-85fd762f5f4e?signature=AYABeAECt9AQsJuPrOGeUbUXhtkAAAADAAdhd3Mta21zAEthcm46YXdzOmttczp1cy13ZXN0LTI6NzA5NTg3ODM1MjQzOmtleS83MDVlZDY3MC1mNTdjLTQxYjUtOWY5Yi1lM2YyZGNjMTQ2ZTcAuAECAQB4IOp8r3eKNYw8z2v%2FEq3%2FfvrZguoGsXpNSaDveR%2FF%2Fo0BV6pdxo325bNwpO5oUxGatgAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDMFgzTd1LvDiqVqykgIBEIA7mKsogpLcvHv42Lmfn1%2F13KCHZqOKrE4M2B%2BocwJUKwA4bcj79JtDXjNzQXh6DL92hewRkzXiu8KA43YAB2F3cy1rbXMAS2Fybjphd3M6a21zOmV1LXdlc3QtMTo3MDk1ODc4MzUyNDM6a2V5LzQ2MzBjZTZiLTAwYzMtNGRlMi04NzdiLTYyN2UyMDYwZTVjYwC4AQICAHijmwVTMt6Oj3F%2B0%2B0cVrojrS8yZ9ktpdfDxqPMSIkvHAGF2sJdwdH7mjEOu%2FJWkIi2AAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM8aXC6Im%2FuBI%2Bd4wXAgEQgDt1ujOFMdVctqPJewL2jSruc91sPa9uAcs4pw9L%2BJEegkbPNuJWUP7nUOxtlWrirAKv2T7qIeDjcZ%2BUNQAHYXdzLWttcwBLYXJuOmF3czprbXM6dXMtZWFzdC0xOjcwOTU4NzgzNTI0MzprZXkvNmMxMjBiYTAtNGNkNS00OTg1LWI4MmUtNDBhMDQ5NTJjYzU3ALgBAgIAeLKa7Dfn9BgbXaQmJGrkKztjV4vrreTkqr7wGwhqIYs5ARyHIrCQG8kOsduKQN33oQsAAAB%2BMHwGCSqGSIb3DQEHBqBvMG0CAQAwaAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAy4U%2BWO6EECjVNuNjwCARCAO6O0W%2BFwdy1HeRKaluh3tU%2FzyQ0hCylu7zR8EvM7eHP%2BAvZu7VliCIVXWYsqY4Ztd%2F8RUtfBzc3o9gKAAgAAAAAMAAAQAAAAAAAAAAAAAAAAAHxjzbWK3lrd%2FMbHI8FgBgT%2F%2F%2F%2F%2FAAAAAQAAAAAAAAAAAAAAAQAAADJpofFpodY6eAPLux4X42PqEIqg7Szauq%2B02bAcPSo%2Fh8m7vYtWsipzFXP3lS55vcY%2FgWd2uGd6gDA0NDIxkiH5xSw%3D&product=jira)

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


## 🏆 Codegeist 2025

- **Originality**: Moves beyond descriptive analytics to behavioral pattern matching.
- **Privacy**: Zero data egress. No external AI services.
- **Utility**: Solves the universal pain of "Estimate Drift" and "Zombie Tickets".
