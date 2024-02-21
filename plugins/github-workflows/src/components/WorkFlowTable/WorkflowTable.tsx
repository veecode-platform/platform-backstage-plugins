/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
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
import { Box, Button, Tooltip, Typography } from '@material-ui/core';
import { SelectBranch } from '../SelectBranch';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import { WorkflowDispatchParameters, WorkflowResultsProps } from '../../utils/types';
import { truncateString } from '../../utils/common';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useEntityAnnotations } from '../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import SyncIcon from '@material-ui/icons/Sync';
import SettingsIcon from '@material-ui/icons/Settings';
import { ModalComponent } from '../ModalComponent';
import DescriptionIcon from '@material-ui/icons/Description';
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';


const useStyles = makeStyles(theme => ({
  title:{
    paddingLeft: '2rem',
    fontSize: '1.5rem'
  },
  options:{
    position: 'absolute',
    top: '0%',
    right: '5%',
    background: 'transparent',
    borderRadius: '30px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.border,
  },
  action: {
    width: '90%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.8rem'
  },
  source: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  clickable:{
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
}));

type DenseTableProps = {
  items: WorkflowResultsProps[] | [],
  updateData: () => Promise<void>
};

export const DenseTable = ({ items, updateData}: DenseTableProps) => {
  
  const { entity } = useEntity();
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [parametersState, setParametersState] = useState<WorkflowDispatchParameters[]|null>(null)
  const [ loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const refresh = async ()=> {
    setLoading(true)
    await updateData();
    setTimeout(()=> setLoading(false), 800)
  }

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCICDLogs = (paramsId: string) => {
    const baseUrl = window.location.origin;
    const newUrl = `${baseUrl}/catalog/${entity.metadata.namespace}/${entity.kind.toLowerCase()}/${entity.metadata.name}/ci-cd/${paramsId}`;
    window.location.href = newUrl;
  }

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name',  width:'1fr', align:'center'},
    { title: 'Status', field: 'status', width:'1fr', align:'center' },
    { title: 'Action', field: 'action', width:'1fr', align:'center' },
    { title: 'Source', field: 'source', width:'1fr', align:'center'},
    { title: 'Logs', field: 'logs', width:'auto', align:'center'}
  ];

  const data = items.map(item => {
    return {
      name: item.name,
      status: (
        <WorkFlowStatus
          status={item.lastRunId !== undefined ? item.status : StatusWorkflowEnum.default}
          conclusion={item.conclusion}
         />
        ),
      action: (
        <Box className={classes.action}>
          {(item.parameters && item.parameters?.length > 0 && item.status !== StatusWorkflowEnum.queued) && 
              <Tooltip title="Add Parameters" placement="top">
                  <SettingsIcon
                    onClick={() => {
                      setParametersState(item.parameters ?? [])
                      handleShowModal()
                    }} />
                </Tooltip>
              }
          
            <WorkFlowActions
              status={item.lastRunId !== undefined ? item.status : StatusWorkflowEnum.default}
              conclusion={item.conclusion}
              workflowId={item.id} 
              parameters={item.parameters ?? []}
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
      logs:(
        <Tooltip title="View Logs" placement="top">
          <DescriptionIcon 
            className={classes.clickable}
            onClick={()=>handleCICDLogs(item.lastRunId!.toString())}
          />
         </Tooltip>
      )
    };
  });

  const TitleBar = (
      <>
        <Typography className={classes.title}>All Workflows</Typography>
        <Box role="combobox" className={classes.options}>
            <SelectBranch/>
        </Box>
      </>
  )

  return (
   <>
    <Table
      style={{width: '100%', padding: '1rem'}}
      title={TitleBar}
      options={{ search: false, paging: true }}
      columns={columns}
      data={data}
      isLoading={loading}
      actions={[
        {
          icon: () => <SyncIcon />,
          tooltip: 'Reload workflow runs',
          isFreeAction: true,
          onClick: () => refresh(),
        },
      ]}
    />
     <>
        {
          showModal && (
            <ModalComponent 
              open={showModal} 
              handleModal={handleShowModal}
              parameters={parametersState ?? []}
              />
          )
        }
        </>
  </>
  );
};

export const WorkflowTable = () => {

  const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entity as Entity);
  const [ loadingState, setLoadingState ] = useState(true);
  const { branch, listAllWorkflows, workflowsState, setWorkflowsState } = useContext(GithubWorkflowsContext);

  const updateData = async ()=> {
    if(projectName){
      const data = await listAllWorkflows(projectName);
      setWorkflowsState(data as WorkflowResultsProps[])
    }
  };

  useEffect(()=>{
    setTimeout(()=>{
      setLoadingState(false)
    },2000)
  },[])

  useEffect(()=>{
      updateData();
  },[branch]);

  
  const { loading, error } = useAsync(async (): Promise<void> => {
    updateData();
  }, []);


  if (loading) {
    return <Progress />;
  }

  if(!error  && !workflowsState) {
    return (
      <>
      { loadingState ? (<Progress />):(<EmptyState
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
    />)}
    </>
    )
  }
  
  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <ErrorBoundary>
      <DenseTable 
      items={workflowsState || []} 
      updateData={updateData}
      />
    </ErrorBoundary>
  );
};
