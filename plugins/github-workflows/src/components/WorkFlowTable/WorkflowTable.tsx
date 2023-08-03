import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableColumn,
  Progress,
  ResponseErrorPanel,
  Link,
  EmptyState
 } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import LanguageIcon from '@material-ui/icons/Language';
import { WorkFlowStatus } from '../WorkFlowStatus';
import { WorkFlowActions } from '../WorkFlowActions';
import { Box, Button, Typography } from '@material-ui/core';
import { SelectBranch } from '../SelectBranch';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import { WorkflowResultsProps } from '../../utils/types';
import { truncateString } from '../../utils/common';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useEntityAnnotations } from '../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';


const useStyles = makeStyles(theme => ({
  title:{
    paddingLeft: '2rem',
    fontSize: '1.5rem'
  },
  options:{
    position: 'absolute',
    top: '0%',
    right: '2%',
    background: 'transparent',
    borderRadius: '30px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.border,
  },
  action: {
    width: '90%',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  source: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  }
}));

type DenseTableProps = {
  items: WorkflowResultsProps[] | [];
};

export const DenseTable = ({ items }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name',  width:'1fr', align:'center'},
    { title: 'Status', field: 'status', width:'1fr', align:'center' },
    { title: 'Action', field: 'action', width:'1fr', align:'center' },
    { title: 'Source', field: 'source', width:'1fr', align:'center'},
  ];

  const data = items.map(item => {
    return {
      name: item.name,
      status: (
        <WorkFlowStatus
          status={item.status}
          conclusion={item.conclusion}
         />
        ),
      action: (
        <Box className={classes.action}>
          <WorkFlowActions
            status={item.status}
            conclusion={item.conclusion}
            workflowId={item.id}
         />
        </Box>
      ),
      source: (
        <Box className={classes.source}>
            <LanguageIcon/> 
            <Link to={item.source ?? ''} title='Visite workflow' target="_blank">
              {truncateString(item.source as string, 40)}
            </Link>
         </Box>
         ),
    };
  });

  const TitleBar = (
      <>
        <Typography className={classes.title}>All Workflows</Typography>
        <Box role="select" className={classes.options}>
            <SelectBranch/>
        </Box>
      </>
  )

  return (
    <Table
      title={TitleBar}
      options={{ search: false, paging: true }}
      columns={columns}
      data={data}
    />
  );
};

export const WorkflowTable = () => {

  const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entity as Entity);
  const { listAllWorkflows, workflowsState, setWorkflowsState } = useContext(GithubWorkflowsContext);

  useEffect(()=>{
    setTimeout(()=>{
      const updateData = async ()=> {
        const data = await listAllWorkflows(projectName);
        setWorkflowsState(data as WorkflowResultsProps[])
      }
      updateData();
    },30000)
  },[workflowsState])
  
  const { loading, error } = useAsync(async (): Promise<void> => {
      const data = await listAllWorkflows(projectName);
      setWorkflowsState(data as WorkflowResultsProps[])
  }, []);

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
          href={`https://github.com/${projectName}/actions/new`}
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
      <DenseTable items={workflowsState || []} />
    </ErrorBoundary>
  );
};
