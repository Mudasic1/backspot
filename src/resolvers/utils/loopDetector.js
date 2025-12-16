/**
 * Detects loops in status transitions (e.g., A -> B -> A).
 * @param {Array} history - The issue changelog.
 * @returns {Array} - Array of detected loops.
 */
export const detectStatusLoops = (history) => {
  const loops = [];
  const statusHistory = [];

  // Extract status changes sorted by date (oldest first)
  const statusChanges = history
    .filter((item) => item.fieldId === "status")
    .sort((a, b) => new Date(a.created) - new Date(b.created));

  // We need to reconstruct the sequence: Initial -> Change 1 (From -> To) -> Change 2 ...
  // This is tricky without the initial status.
  // We'll focus on the "To" values of the changes.

  statusChanges.forEach((change) => {
    statusHistory.push({
      status: change.to,
      timestamp: change.created,
    });
  });

  // Simple detection: If we visit a status we've recently visited (within last N steps?)
  // Or just counting occurrences?
  // "Ping pong" is specifically A -> B -> A.

  for (let i = 0; i < statusHistory.length; i++) {
    const current = statusHistory[i].status;
    // Check if this status appeared previously
    const prevIndex = statusHistory
      .slice(0, i)
      .findLastIndex((s) => s.status === current);

    if (prevIndex !== -1) {
      // We found a loop: ... -> Current -> ... -> Current
      // The loop path is statusHistory[prevIndex...i]
      loops.push({
        status: current,
        start: statusHistory[prevIndex].timestamp,
        end: statusHistory[i].timestamp,
        duration:
          new Date(statusHistory[i].timestamp) -
          new Date(statusHistory[prevIndex].timestamp),
      });
    }
  }

  return loops;
};

/**
 * Detects frequent assignee changes (churn).
 * @param {Array} history - The issue changelog.
 * @returns {number} - Number of assignee changes.
 */
export const detectAssigneeChurn = (history) => {
  return history.filter((item) => item.fieldId === "assignee").length;
};
