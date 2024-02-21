/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { EmptyState, ErrorBoundary, MissingAnnotationEmptyState, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, IconButton, Paper, Typography, makeStyles } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import useAsync from 'react-use/lib/useAsync';
import { WORKFLOW_ANNOTATION, useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { SelectBranch } from '../SelectBranch';
import { WorkflowResultsProps } from '../../utils/types';
import CachedIcon from '@material-ui/icons/Cached';
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';
import { useTranslationRef } from '@backstage/core-plugin-api/dist/alpha';
import { githubWorkflowsTranslationRef } from '../../translation';

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
    marginTop: '10%'
  },
  loadingComponent:{
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.3rem 0'
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
  info: {
    width: '100%',
    textAlign: 'center'
  }

}));


type CardsProps = {
  items: WorkflowResultsProps[] | [],
  updateData: () => Promise<void>
}

export const Cards = ({ items, updateData }: CardsProps) => {

  const [ loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const { t } = useTranslationRef(githubWorkflowsTranslationRef);

  const refresh = async ()=> {
    setLoading(true)
    await updateData()
    setTimeout(()=> setLoading(false), 1500);
  }

  const TitleBar = (
    <>
      <Typography className={classes.title}>{t('workflowCard.title')}</Typography>
    </>
  );

  const ActionsCard = (
    <Box className={classes.options}>
      <SelectBranch/>

      <IconButton
        aria-label="Refresh"
        title={t('workflowCard.refreshButtonTooltip')}
        onClick={() => refresh()}
        className={classes.buttonRefresh}
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
         <CardContent className={classes.workflowsGroup}>
          {loading ?
            (<Box className={classes.loadingComponent}> <CircularProgress />  </Box>) :
            (
              <>
                {
                  items.length === 0 ? <div className={classes.info}>{t('workflowCard.noRecords')}</div> : (
                    items.map(item =>
                      (<WorkFlowItem
                        id={item.id!}
                        key={item.id}
                        status={item.lastRunId !== undefined ? item.status : StatusWorkflowEnum.default}
                        conclusion={item.conclusion}
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

export const WorkFlowCard = () => {
  
  const { entity } = useEntity();
  const { projectName, workflows } = useEntityAnnotations(entity as Entity)
  const { listAllWorkflows, branch, workflowsState, setWorkflowsState } = useContext(GithubWorkflowsContext);
  const { t } = useTranslationRef(githubWorkflowsTranslationRef);

  const updateData = async ()=> {
    const data = await listAllWorkflows(projectName, workflows as string[]);
    setWorkflowsState(data as WorkflowResultsProps[])
  }

  useEffect(()=>{
      updateData();
  },[branch]);



 const { loading, error } = useAsync(async (): Promise<void> => {
  if(workflows){
    const data = await listAllWorkflows(projectName, workflows);
    setWorkflowsState(data as WorkflowResultsProps[])
  }
}, []);

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
      title={t('emptyState.title')}
      description={t('emptyState.description')}
      action={
        <Button
          variant="contained"
          color="primary"
          href={`https://github.com/${projectName}/actions/new`}
        >
          {t('emptyState.createWorkflowButton')}
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