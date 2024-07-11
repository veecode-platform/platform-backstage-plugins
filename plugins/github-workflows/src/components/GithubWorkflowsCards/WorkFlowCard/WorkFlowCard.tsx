/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { EmptyState, ErrorBoundary, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, IconButton, Paper, Typography } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';
import useAsync from 'react-use/lib/useAsync';
import { useEntityAnnotations } from '../../../hooks/useEntityAnnotations';
import { useEntity,MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { WorkflowResultsProps } from '../../../utils/types';
import CachedIcon from '@material-ui/icons/Cached';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import GithubIcon from '../../../assets/GithubIcon';
import { useWorkflowCardStyles } from './styles';
import { useGithuWorkflowsContext } from '../../../context';
import { CardsProps } from './types';
import SelectBranch from '../../SelectBranch/SelectBranch';
import { WORKFLOW_ANNOTATION } from '../../../utils/constants/annotations';


export const Cards : React.FC<CardsProps> = ({ items, updateData }) => {

  const [ loading, setLoading] = useState<boolean>(false);
  const {title, options, buttonRefresh,workflowsGroup,loadingComponent,info} = useWorkflowCardStyles();

  const refresh = async ()=> {
    setLoading(true)
    await updateData()
    setTimeout(()=> setLoading(false), 1500);
  }

  const TitleBar = (
    <>
      <Typography className={title}>
        <GithubIcon/>
        Workflows
      </Typography>
    </>
  );

  const ActionsCard = (
    <Box className={options}>
      <SelectBranch/>

      <IconButton
        aria-label="Refresh"
        title="Refresh"
        onClick={() => refresh()}
        className={buttonRefresh}
      >
        <CachedIcon />
      </IconButton>
    </Box>
  )


  return (
    <Paper>
      <Card>
        <CardHeader
          title={TitleBar} 
          action={ActionsCard}
         />
         <CardContent className={workflowsGroup}>
          {loading ?
            (<Box className={loadingComponent}> <CircularProgress />  </Box>) :
            (
              <>
                {
                  items.length === 0 ? <div className={info}>No records to display</div> : (
                    items.map(item =>
                      (<WorkFlowItem
                        id={item.id!}
                        key={item.id}
                        status={item.status}
                        conclusion={item.lastRunId !== undefined ? item.conclusion : StatusWorkflowEnum.default}
                        workflowName={item.name as string}
                        parameters={item.parameters}
                        lastRunId={item.lastRunId?.toString()}
                      />)
                    )
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

const WorkFlowCard = () => {
  
  const { entity } = useEntity();
  const { projectName, workflows, hostname } = useEntityAnnotations(entity as Entity)
  const { listAllWorkflows, branch, workflowsState, setWorkflowsState } = useGithuWorkflowsContext();

  const updateData = async ()=> {
    const data = await listAllWorkflows(hostname,projectName, workflows as string[]);
    setWorkflowsState(data as WorkflowResultsProps[])
  }

  const { loading, error } = useAsync(async (): Promise<void> => {
    if(workflows){
      const data = await listAllWorkflows(hostname,projectName, workflows);
      setWorkflowsState(data as WorkflowResultsProps[])
    }
}, []);

  useEffect(()=>{
    updateData();
  },[branch])


  if(!workflows){
    return (
      <MissingAnnotationEmptyState annotation={WORKFLOW_ANNOTATION} />
    )
  }

  if (loading) {
    return <Progress />;
  } 

  if(!error && !workflowsState) {
    return (
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
    )
  }
  
  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <ErrorBoundary>
       <Cards items={workflowsState || []} updateData={updateData} />
    </ErrorBoundary>
    );
};

export default memo(WorkFlowCard)