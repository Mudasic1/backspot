import Resolver from "@forge/resolver";
import { analyzeIssueService } from "../services/issueAnalyzer";
import { analyzeProjectService } from "../services/projectAnalyzer";

const resolver = new Resolver();

resolver.define("analyzeIssue", async (req) => {
  const { issueId } = req.payload;
  console.log(`Analyzing issue: ${issueId}`);
  try {
    const analysis = await analyzeIssueService(issueId);
    return analysis;
  } catch (error) {
    console.error(`Error analyzing issue ${issueId}:`, error);
    // Return a safe error object to the frontend
    return {
      error: "Failed to analyze issue",
      details: error.message,
    };
  }
});

resolver.define("analyzeProject", async (req) => {
  const { projectId } = req.payload; // Or projectKey provided by context
  // When called from a Project Page, we might get context.extension.project.key or similar
  const key = projectId || req.context.extension.project.key;

  console.log(`Analyzing project: ${key}`);

  try {
    const analysis = await analyzeProjectService(key);
    return analysis;
  } catch (error) {
    console.error(`Error analyzing project ${key}:`, error);
    return {
      error: "Failed to analyze project",
      details: error.message,
    };
  }
});

export const handler = resolver.getDefinitions();
