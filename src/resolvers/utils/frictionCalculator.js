/**
 * Calculates a 'Friction Score' for an issue.
 *
 * Formula:
 * (Reopens * 2.0) +
 * (Loops * 1.5) +
 * (Backtracks * 1.0) +
 * (Assignee Changes * 0.5) +
 * (Idle Days * 0.1)
 *
 * @param {Object} signals - The detected friction signals.
 * @returns {number} - The calculated score (0-10+).
 */
export const calculateFrictionScore = (signals) => {
  const {
    reopens = 0,
    loops = 0,
    backtracks = 0,
    assigneeChanges = 0,
    idleDays = 0,
  } = signals;

  const score =
    reopens * 2.0 +
    loops * 1.5 +
    backtracks * 1.0 +
    assigneeChanges * 0.5 +
    idleDays * 0.1;

  return parseFloat(score.toFixed(1)); // Return as number with 1 decimal
};

/**
 * Returns a human-readable interpretation of the friction score.
 * @param {number} score
 * @returns {Object} - { level: 'Low'|'Medium'|'High', color: 'color' }
 */
export const getFrictionLevel = (score) => {
  if (score < 3) return { level: "Smooth", color: "green" };
  if (score < 7) return { level: "Friction", color: "orange" };
  return { level: "High Friction", color: "red" };
};
