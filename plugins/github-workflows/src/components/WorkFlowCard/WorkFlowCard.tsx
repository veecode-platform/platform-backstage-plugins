import React, { useContext, useEffect } from 'react';
import { ErrorBoundary, MissingAnnotationEmptyState, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Card, CardContent, CardHeader, Paper, Typography, makeStyles } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import useAsync from 'react-use/lib/useAsync';
import { WORKFLOW_ANNOTATION, useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { SelectBranch } from '../SelectBranch';
import { WorkflowResultsProps } from '../../utils/types';

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: '1.5rem',
    fontSize: '1.5rem'
  },
    options:{
    padding: '0 2rem 1rem 0'
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
    borderTop: `1px solid ${theme.palette.divider}`,
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

// type WorkFlowCardProps = {
//   workFlowId: number,
//   lastRunId: number,
//   status: string,
//   conclusion: string,
//   workFlowName: string
// }

type CardsProps = {
  items: WorkflowResultsProps[] | []
}

export const Cards = ({ items }: CardsProps) => {

  const classes = useStyles();

  const TitleBar = (
    <>
      <Typography className={classes.title}>Workflows</Typography>
    </>
  );

  const ActionsCard = (
    <Box className={classes.options}>
      <SelectBranch/>
    </Box>
  )


  return (
    <Paper>
      <Card>
        <CardHeader
          title={TitleBar}
          action={ActionsCard}
         />

        <CardContent className={classes.workflowsGroup}>
          {items.map(item =>
            <WorkFlowItem
              id={item.id!}
              key={item.id}
              status={item.status}
              conclusion={item.conclusion}
              workflowName={item.name as string}
            />
          )
          }
        </CardContent>
      </Card>
    </Paper>
  )
}

export const WorkFlowCard = () => {
  
  const { entity } = useEntity();
  const { projectName, workflows } = useEntityAnnotations(entity as Entity)
  const { listAllWorkflows, workflowsState, setWorkflowsState } = useContext(GithubWorkflowsContext);

  useEffect(()=>{
    setTimeout(()=>{
      const updateData = async ()=> {
        const data = await listAllWorkflows(projectName);
        setWorkflowsState(data as WorkflowResultsProps[])
      }
      updateData();
    },25000)
  },[workflowsState])

  if(!workflows){
    return (
      <MissingAnnotationEmptyState annotation={WORKFLOW_ANNOTATION} />
    )
  }

  const { loading, error } = useAsync(async (): Promise<void> => {
    const data = await listAllWorkflows(projectName);
    setWorkflowsState(data as WorkflowResultsProps[])
}, []);

  if (loading) {
    return <Progress />;
  } 

  if(!error && !workflowsState) {
    return (
      <MissingAnnotationEmptyState annotation={WORKFLOW_ANNOTATION} />
    )
  }
  
  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <ErrorBoundary>
       <Cards items={workflowsState || []} />
    </ErrorBoundary>
    );
};