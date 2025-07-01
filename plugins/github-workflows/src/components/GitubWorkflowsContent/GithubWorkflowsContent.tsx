import React from 'react';
import { Button, Grid } from '@material-ui/core';
import {
  GithubWorkflowsProvider,
  useGithuWorkflowsContext,
} from '../../context/GithubWorkflowsProvider';
import { Route, Routes } from 'react-router-dom';
import WorkflowTable from './WorkFlowTable/WorkflowTable';
import WorkFlowsCards from './WorkFlowsCards/WorkFlowsCards';
import { GithubWorkflowsEntityProps } from './types';
import { WorkflowResultsProps } from '../../utils/types';
import useAsync from 'react-use/esm/useAsync';
import {
  EmptyState,
  ErrorBoundary,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import WorkflowsDetails from './WorkflowsDetails/WorkflowsDetails';
import { addWorkflows } from '../../context/state';
import { workflowFilter } from '../../utils/helpers/filters';

const WorkflowContent: React.FC<GithubWorkflowsEntityProps> = props => {
  const { cards } = props;
  const [loadingState, setLoadingState] = React.useState(true);
  const {
    setCardsView,
    entity,
    hostname,
    projectName,
    workflowsByAnnotation,
    listAllWorkflows,
    allWorkflowsState,
    dispatchWorkflows,
  } = useGithuWorkflowsContext();
  const filters = workflowFilter(workflowsByAnnotation);

  const updateData = async () => {
    const data = await listAllWorkflows(cards ? filters : []);
    dispatchWorkflows(addWorkflows(data as WorkflowResultsProps[]));
  };

  const { value, loading, error } = useAsync(async (): Promise<void> => {
    await listAllWorkflows(cards ? filters : []);
  }, [entity]);

  React.useEffect(() => {
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (cards) {
      setCardsView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  if (loading) {
    return <Progress />;
  }

  if (!error && !allWorkflowsState) {
    return (
      <>
        {loadingState ? (
          <Progress />
        ) : (
          <EmptyState
            missing="data"
            title="No Workflow Data"
            description="This component has GitHub Actions enabled, but no data was found. Have you created any Workflows? Click the button below to create a new Workflow."
            action={
              <Button
                variant="contained"
                color="primary"
                href={`https://${hostname}/${projectName}/actions/new`}
              >
                Create new Workflow
              </Button>
            }
          />
        )}
      </>
    );
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if (cards) {
    return (
      <Grid item>
        <WorkFlowsCards
          items={allWorkflowsState ?? value}
          updateData={updateData}
        />
      </Grid>
    );
  }

  return (
    <ErrorBoundary>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <WorkflowTable
            items={allWorkflowsState ?? value}
            updateData={updateData}
          />
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};

export const GithubWorkflowsContent: React.FC<
  GithubWorkflowsEntityProps
> = props => {
  return (
    <GithubWorkflowsProvider>
      <Routes>
        <Route path="/" element={<WorkflowContent {...props} />} />
        <Route path="/:id" element={<WorkflowsDetails />} />
      </Routes>
    </GithubWorkflowsProvider>
  );
};

// For Dynamic exports
export const GithubWorkflowsOverviewContent = () => (
  <GithubWorkflowsContent cards />
);
export const GithubWorkflowsTabContent = () => <GithubWorkflowsContent />;
