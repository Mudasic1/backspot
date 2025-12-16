import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import {
  Box,
  Stack,
  Text,
  Heading,
  Lozenge,
  Spinner,
  Button,
  Inline,
  SectionMessage,
  DynamicTable,
} from "@forge/react";

const IssuePanel = ({ context }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const issueId = context.extension.issue.id;

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await invoke("analyzeIssue", { issueId });
      setAnalysis(result);
    } catch (err) {
      setError(err.message || "Failed to analyze issue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [issueId]);

  if (loading) {
    return (
      <Stack alignInline="center" padding="large">
        <Spinner size="large" />
        <Text>Analyzing issue history for friction...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <SectionMessage appearance="error" title="Analysis Failed">
        <Text>{error}</Text>
        <Button onClick={fetchAnalysis}>Retry</Button>
      </SectionMessage>
    );
  }

  // Safety check if analysis came back with error property
  if (analysis && analysis.error) {
    return (
      <SectionMessage appearance="error" title="Analysis Error">
        <Text>{analysis.details}</Text>
      </SectionMessage>
    );
  }

  const { score, level, color, signals } = analysis;

  return (
    <Stack space="space.200" padding="space.200">
      {/* Header Score */}
      <Box
        backgroundColor="elevation.surface"
        padding="space.200"
        xcss={{
          borderRadius: "border.radius",
          border: `2px solid ${
            color === "red"
              ? "#FF5252"
              : color === "orange"
              ? "#FFAB40"
              : "#66BB6A"
          }`,
        }}
      >
        <Inline spread="space-between" alignBlock="center">
          <Stack>
            <Heading as="h2">Friction Score: {score}</Heading>
            <Text>{level}</Text>
          </Stack>
          <Lozenge
            appearance={
              color === "red"
                ? "removed"
                : color === "orange"
                ? "inprogress"
                : "success"
            }
            isBold
          >
            {level}
          </Lozenge>
        </Inline>
      </Box>

      {/* Insights */}
      <Stack space="space.100">
        <Heading as="h3">Signals Detected</Heading>

        {signals.loops.length > 0 ? (
          <SectionMessage appearance="warning" title="Rework Loops Detected">
            <Text>
              This issue has bounced between statuses {signals.loops.length}{" "}
              times.
            </Text>
            <Stack space="space.050">
              {signals.loops.map((loop, i) => (
                <Text key={i}>
                  • {loop.status} (Duration:{" "}
                  {(loop.duration / (1000 * 60 * 60)).toFixed(1)}h)
                </Text> // Simple duration display
              ))}
            </Stack>
          </SectionMessage>
        ) : (
          <Text>No status loops detected.</Text>
        )}

        {signals.assigneeChanges > 2 ? (
          <SectionMessage appearance="warning" title="High Assignee Churn">
            <Text>Assignee changed {signals.assigneeChanges} times.</Text>
          </SectionMessage>
        ) : (
          <Text>Assignee stability is good.</Text>
        )}
      </Stack>

      <Button onClick={fetchAnalysis} appearance="subtle">
        Refresh Analysis
      </Button>
    </Stack>
  );
};

export default IssuePanel;
