import api, { route } from "@forge/api";
import { analyzeIssueService } from "./issueAnalyzer";

/**
 * Analyzes a project for systemic friction patterns.
 * Fetches recent issues and aggregates their friction scores.
 * @param {string} projectKeyOrId
 * @returns {Object} Project-level insights.
 */
export const analyzeProjectService = async (projectKeyOrId) => {
  // 1. Fetch recent issues (limit 50 for performance)
  const jql = `project = "${projectKeyOrId}" ORDER BY updated DESC`;
  const response = await api
    .asUser()
    .requestJira(
      route`/rest/api/3/search?jql=${jql}&maxResults=20&fields=key,summary,status,created`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

  if (!response.ok) {
    throw new Error(`Failed to search project: ${response.status}`);
  }

  const data = await response.json();
  const issues = data.issues;

  // 2. Analyze each issue in parallel
  // Be careful with API rate limits.
  // We might need to reduce batch size or depth of analysis per issue.
  // For MVP, we will run full analysis on these 20 issues.

  // LIMITATION: 'analyzeIssueService' fetches changelog per issue. 20 issues = 20 extra calls.
  // This is fine for a demo/MVP but might be slow.

  const analysisPromises = issues.map((issue) =>
    analyzeIssueService(issue.key).catch((e) => ({
      issueKey: issue.key,
      error: e.message,
      score: 0,
    }))
  );
  const results = await Promise.all(analysisPromises);

  // 3. Aggregate Results
  let totalScore = 0;
  let maxScore = 0;
  let highFrictionIssues = [];

  results.forEach((r) => {
    if (r.error) return;
    totalScore += r.score;
    if (r.score > maxScore) maxScore = r.score;
    if (r.score >= 5) highFrictionIssues.push(r);
  });

  const averageScore =
    results.length > 0 ? (totalScore / results.length).toFixed(1) : 0;

  return {
    projectKey: projectKeyOrId,
    issuesAnalyzed: results.length,
    averageFriction: averageScore,
    maxFriction: maxScore,
    highFrictionIssues: highFrictionIssues.sort((a, b) => b.score - a.score),
    timestamp: new Date().toISOString(),
  };
};
