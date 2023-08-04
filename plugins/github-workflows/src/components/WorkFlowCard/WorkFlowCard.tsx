import React, { useContext, useEffect, useState } from 'react';
import { ErrorBoundary, MissingAnnotationEmptyState, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Paper, Typography, makeStyles } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import useAsync from 'react-use/lib/useAsync';
import { WORKFLOW_ANNOTATION, useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { SelectBranch } from '../SelectBranch';
import { WorkflowResultsProps } from '../../utils/types';
import SyncIcon from '@material-ui/icons/Sync';

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: '1.5rem',
    fontSize: '1.5rem'
  },
  options:{
    padding: '0 0 1rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  buttonRefresh:{
    padding: '1rem',
    cursor: 'pointer',
    height: '0',
    marginTop: '8%'
  },
  loadingComponent:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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


type CardsProps = {
  items: WorkflowResultsProps[] | []
}

export const Cards = ({ items }: CardsProps) => {

  const [ loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const { entity } = useEntity();
  const { projectName, workflows } = useEntityAnnotations(entity as Entity);
  const { listAllWorkflows, setWorkflowsState } = useContext(GithubWorkflowsContext);

  const updateData = async ()=> {
    setLoading(true)
    const data = await listAllWorkflows(projectName, workflows!);
    setWorkflowsState(data as WorkflowResultsProps[]);
    setTimeout(()=> setLoading(false), 1500);
  }

  const TitleBar = (
    <>
      <Typography className={classes.title}>Workflows</Typography>
    </>
  );

  const ActionsCard = (
    <Box className={classes.options}>
      <SelectBranch/>
      <Button 
        className={classes.buttonRefresh}
        onClick={()=>updateData()}
        >
        <SyncIcon />
      </Button>
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
      { loading ?  
     (<Box className={classes.loadingComponent}> <CircularProgress />  </Box> ): 
(                
               <>
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
               </>
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
  const { listAllWorkflows, branch, workflowsState, setWorkflowsState } = useContext(GithubWorkflowsContext);

  useEffect(()=>{
      updateData();
  },[branch])

  const updateData = async ()=> {
    const data = await listAllWorkflows(projectName, workflows as string[]);
    setWorkflowsState(data as WorkflowResultsProps[])
  }

  if(!workflows){
    return (
      <MissingAnnotationEmptyState annotation={WORKFLOW_ANNOTATION} />
    )
  }

  const { loading, error } = useAsync(async (): Promise<void> => {
    const data = await listAllWorkflows(projectName, workflows);
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