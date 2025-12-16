import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text, Image, Stack } from "@forge/react";
import { view } from "@forge/bridge";
import IssuePanel from "./components/IssuePanel";
import ProjectPage from "./components/ProjectPage";

const App = () => {
  const [context, setContext] = useState(null);

  useEffect(() => {
    view.getContext().then(setContext);
  }, []);

  if (!context) {
    return (
      <Stack alignInline="center">
        <Text>Loading context...</Text>
      </Stack>
    );
  }

  // Determine where we are rendering based on the moduleKey or context
  // The module key is defined in manifest.yml
  const moduleKey = context.moduleKey;

  if (moduleKey === "backspot-hello-world-issue-panel") {
    return <IssuePanel context={context} />;
  }

  if (moduleKey === "backspot-project-page") {
    return <ProjectPage context={context} />;
  }

  return (
    <Stack>
      <Text>Unknown Context</Text>
      <Text>{JSON.stringify(context)}</Text>
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
