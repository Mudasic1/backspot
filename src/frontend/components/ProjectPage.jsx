import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import {
  Stack,
  Text,
  Heading,
  Spinner,
  Button,
  SectionMessage,
  DynamicTable,
  Inline,
  Box,
} from "@forge/react";

const ProjectPage = ({ context }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = context.extension.project.id;
  const projectKey = context.extension.project.key;

  const fetchProjectAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await invoke("analyzeProject", { projectId });
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to analyze project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectAnalysis();
  }, [projectId]);

  if (loading) {
    return (
      <Stack alignInline="center" padding="large">
        <Spinner size="large" />
        <Text>Scanning project issues for friction patterns...</Text>
        <Text>This may take a moment.</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <SectionMessage appearance="error" title="Analysis Failed">
        <Text>{error}</Text>
        <Button onClick={fetchProjectAnalysis}>Retry</Button>
      </SectionMessage>
    );
  }

  if (data && data.error) {
    return (
      <SectionMessage appearance="error" title="Analysis Error">
        <Text>{data.details}</Text>
      </SectionMessage>
    );
  }

  const { averageFriction, maxFriction, highFrictionIssues, issuesAnalyzed } =
    data;

  const head = {
    cells: [
      { key: "key", content: "Issue Key", isSortable: true },
      { key: "summary", content: "Summary", isSortable: false },
      { key: "score", content: "Friction Score", isSortable: true },
    ],
  };

  const rows = highFrictionIssues.map((issue, index) => ({
    key: `row-${index}`,
    cells: [
      { key: "key", content: issue.issueKey },
      { key: "summary", content: issue.summary },
      { key: "score", content: <Text>{issue.score}</Text> },
    ],
  }));

  return (
    <Stack space="space.400" padding="space.400">
      <Heading as="h1">Friction Analysis: {projectKey}</Heading>

      <Inline space="space.400">
        <Box
          padding="space.200"
          backgroundColor="elevation.surface"
          xcss={{ borderRadius: "border.radius", minWidth: "150px" }}
        >
          <Stack alignInline="center">
            <Heading as="h1">{averageFriction}</Heading>
            <Text>Avg Friction</Text>
          </Stack>
        </Box>
        <Box
          padding="space.200"
          backgroundColor="elevation.surface"
          xcss={{ borderRadius: "border.radius", minWidth: "150px" }}
        >
          <Stack alignInline="center">
            <Heading as="h1">{maxFriction}</Heading>
            <Text>Max Friction</Text>
          </Stack>
        </Box>
        <Box
          padding="space.200"
          backgroundColor="elevation.surface"
          xcss={{ borderRadius: "border.radius", minWidth: "150px" }}
        >
          <Stack alignInline="center">
            <Heading as="h1">{issuesAnalyzed}</Heading>
            <Text>Issues Analyzed</Text>
          </Stack>
        </Box>
      </Inline>

      <Stack space="space.200">
        <Heading as="h3">High Friction Issues</Heading>
        {rows.length > 0 ? (
          <DynamicTable
            head={head}
            rows={rows}
            rowsPerPage={10}
            defaultPage={1}
            loadingSpinnerSize="large"
            emptyView={<Text>No high friction issues found.</Text>}
          />
        ) : (
          <SectionMessage appearance="success">
            <Text>
              No high friction detection in the recent {issuesAnalyzed} issues.
              Great work!
            </Text>
          </SectionMessage>
        )}
      </Stack>

      <Button onClick={fetchProjectAnalysis}>Refresh Analysis</Button>
    </Stack>
  );
};

export default ProjectPage;
