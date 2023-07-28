import React, { useContext } from 'react';
import { ErrorBoundary, InfoCard, MissingAnnotationEmptyState, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import useAsync from 'react-use/lib/useAsync';
import { WORKFLOW_ANNOTATION, useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { entityMock } from '../../mocks/component';

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: '1.5rem',
    fontSize: '1.5rem'
  },
  workflowsGroup: {
    width: '95%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '2rem 1rem',
    gap: '1.5rem',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '50px',
      background: theme.palette.grey[600],

    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
      height: '2px'
    }
  },

}));

type WorkFlowCardProps = {
  workFlowId: number,
  lastRunId: number,
  status: string,
  conclusion: string,
  workFlowName: string
}

type CardsProps = {
  items: WorkFlowCardProps[] | []
}

export const Cards = ({ items }: CardsProps) => {

  const classes = useStyles();

  const TitleBar = (
    <>
      <Typography className={classes.title}>Workflows</Typography>
    </>
  )

  return (
    <Paper>
      <InfoCard title={TitleBar}>
        <Box className={classes.workflowsGroup}>
          {items.map(item =>
            <WorkFlowItem
              id={item.workFlowId}
              key={item.workFlowId}
              status={item.status}
              conclusion={item.conclusion}
              workflowName={item.workFlowName}
            />
          )
          }
        </Box>
      </InfoCard>
    </Paper>
  )
}

export const WorkFlowCard = () => {

  const { workflowByAnnotation } = useContext(GithubWorkflowsContext);
  const { workflows } = useEntityAnnotations(entityMock);

  if(!workflows){
    return (
      <MissingAnnotationEmptyState annotation={WORKFLOW_ANNOTATION} />
    )
  }

  const { value, loading, error } = useAsync(async (): Promise<WorkFlowCardProps[] | []> => {
    const workflowsByAnnotationResult = await workflowByAnnotation(workflows);

    const data = workflowsByAnnotationResult?.map(
      w => {
        return {
          workFlowId: w.id as number,
          lastRunId: w.lastRunId as number,
          status: w.status as string,
          conclusion: w.conclusion as string,
          workFlowName: w.name as string
        }
      }
    )

    return data || []
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <ErrorBoundary>
       <Cards items={value || []} />
    </ErrorBoundary>
    );
};