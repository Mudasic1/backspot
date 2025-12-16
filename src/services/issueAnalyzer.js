import api, { route } from "@forge/api";
import {
  calculateIdleTime,
  daysBetween,
} from "../resolvers/utils/timeCalculator";
import {
  detectStatusLoops,
  detectAssigneeChurn,
} from "../resolvers/utils/loopDetector";
import {
  calculateFrictionScore,
  getFrictionLevel,
} from "../resolvers/utils/frictionCalculator";

/**
 * Analyzes a single issue for hidden friction.
 * @param {string} issueId - The Jira Issue Key or ID.
 * @returns {Object} - Analysis result including friction score and signals.
 */
export const analyzeIssueService = async (issueId) => {
  // 1. Fetch Issue Data & Changelog
  // We need the changelog to see history of Status and Assignee
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}?expand=changelog`, {
      headers: {
        Accept: "application/json",
      },
    });

  if (!response.ok) {
    console.error(`Failed to fetch issue ${issueId}`, response.status);
    throw new Error(`Failed to fetch issue data: ${response.status}`);
  }

  const data = await response.json();
  const changelog = data.changelog.histories;
  const createdDate = data.fields.created;
  const currentStatus = data.fields.status.name;

  // 2. Parse Changelog
  // We are interested in 'status' and 'assignee' field changes.
  const flatHistory = [];

  if (changelog && changelog.length > 0) {
    changelog.forEach((historyItem) => {
      historyItem.items.forEach((changeItem) => {
        if (changeItem.field === "status" || changeItem.field === "assignee") {
          flatHistory.push({
            fieldId: changeItem.field,
            from: changeItem.fromString,
            to: changeItem.toString,
            created: historyItem.created,
            author: historyItem.author,
          });
        }
      });
    });
  }

  // 3. Detect Signals
  const statusLoops = detectStatusLoops(flatHistory);
  const assigneeChanges = detectAssigneeChurn(flatHistory);

  // Reopens: Status changed from "Done" (or similar) to "To Do"/"In Progress"
  // Logic: Identify "Done" category statuses?
  // For MVP: Detect transition loops where one state was considered 'Done'?
  // Simplified: Count how many times we went into a "Done" status and came out?
  // Let's stick to statusLoops for now which covers "Done -> In Progress -> Done" (A->B->A).

  // Backtracks: Moving "backward" in workflow? Hard to know without workflow config.
  // We'll rely on loops as a proxy for now.

  const idleDays = calculateIdleTime(flatHistory); // TODO: Refine this logic

  // 4. Calculate Score
  const signals = {
    reopens: 0, // TODO: refined detection
    loops: statusLoops.length,
    backtracks: 0,
    assigneeChanges: assigneeChanges,
    idleDays: 0, // Placeholder
  };

  const score = calculateFrictionScore(signals);
  const interpretation = getFrictionLevel(score);

  return {
    issueKey: data.key,
    summary: data.fields.summary,
    score,
    level: interpretation.level,
    color: interpretation.color,
    signals: {
      loops: statusLoops,
      assigneeChanges,
    },
    historyCount: flatHistory.length,
  };
};
