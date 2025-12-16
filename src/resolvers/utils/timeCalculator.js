/**
 * Calculates the total time spent in "idle" statuses.
 * @param {Array} history - The issue changelog.
 * @param {Array} idleStatuses - List of statuses considered "idle" (e.g., "To Do", "Blocked").
 * @returns {number} - Total idle time in milliseconds.
 */
export const calculateIdleTime = (
  history,
  idleStatuses = ["To Do", "Blocked", "Backlog"]
) => {
  let idleTime = 0;
  let lastStatusChange = new Date(history[0]?.created); // Fallback to issue creation? Requires extensive history analysis
  // Simplified: We assume we get a sorted history.
  // In reality, we need the full history including initial creation.
  // For MVP, we'll iterate through changelog items that change 'status'.

  // TODO: Implement robust time calculation based on changelog timestamps.
  // This requires knowing the START time of a status.
  // Changelog gives us: At Time T, Field 'status' changed from A to B.
  // So the issue was in status A from (Previous T or Creation) to T.

  return 0; // Placeholder for now
};

/**
 * Calculates the time difference between two dates in days.
 * @param {string} date1 - ISO date string.
 * @param {string} date2 - ISO date string.
 * @returns {number} - Difference in days.
 */
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
