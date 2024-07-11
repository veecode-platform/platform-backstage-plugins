import React, { memo, useEffect, useState } from 'react';
import { Table, TableColumn, Progress, ResponseErrorPanel, Link, EmptyState } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import LanguageIcon from '@material-ui/icons/Language';
import { WorkFlowStatus } from '../../WorkFlowStatus';
import { WorkFlowActions } from '../../WorkFlowActions';
import { Box, Button, Tooltip, Typography } from '@material-ui/core';
import { WorkflowDispatchParameters, WorkflowResultsProps } from '../../../utils/types';
import { truncateString } from '../../../utils/helpers';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { useEntityAnnotations } from '../../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import SyncIcon from '@material-ui/icons/Sync';
import SettingsIcon from '@material-ui/icons/Settings';
import { ModalComponent } from '../../ModalComponent';
import DescriptionIcon from '@material-ui/icons/Description';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import GithubIcon from '../../../assets/GithubIcon';
import { useNavigate } from 'react-router-dom';
import Timer from '@material-ui/icons/Timer';
import { useWorkflowTableStyles } from './styles';
import { useGithuWorkflowsContext } from '../../../context';
import { DenseTableProps } from './types';
import SelectBranch from '../../SelectBranch/SelectBranch';
import { IoOpenOutline } from "react-icons/io5";


export const DenseTable : React.FC<DenseTableProps> = ({ items, updateData} ) => {
  
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [parametersState, setParametersState] = useState<WorkflowDispatchParameters[]|null>(null)
  const [ loading, setLoading] = useState<boolean>(false);
  const { entity } = useEntity();
  const { projectName, hostname } = useEntityAnnotations(entity as Entity);
  const navigate = useNavigate();
  const {action,source,clickable,title,options,name} = useWorkflowTableStyles();

  const refresh = async ()=> {
    setLoading(true)
    await updateData();
    setTimeout(()=> setLoading(false), 800)
  }

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCICDLogs = (id: string) => {   
    navigate(`/catalog/${entity.metadata.namespace}/${entity.kind.toLowerCase()}/${entity.metadata.name}/ci-cd/${id}`) 
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
      name: (
        <div className={name}>
          {item.name} 
           <Tooltip
                title={
                  item.lastRunId ? 'Open the actions panel on github...' : 'First, run the workflow!'
                }
                placement="bottom"
              >
                <Link to={item.lastRunId ? `https://${hostname}/${projectName}/actions/runs/${item.lastRunId}` : '#'} target='_blank'>
                <IoOpenOutline
                  className={clickable}
                  color={item.lastRunId ? 'primary' : 'disabled'}
                />
                </Link>
              </Tooltip>
        </div>
      ),
      status: (
        <WorkFlowStatus
          status={
            item.lastRunId !== undefined
              ? item.status
              : StatusWorkflowEnum.default
          }
          conclusion={item.conclusion}
        />
      ),
      action: (
        <Box className={action}>
          {item.parameters &&
            item.parameters?.length > 0 &&
            item.status !== StatusWorkflowEnum.queued && (
              <Tooltip title="Add Parameters" placement="top">
                <SettingsIcon
                  onClick={() => {
                    setParametersState(item.parameters ?? []);
                    handleShowModal();
                  }}
                />
              </Tooltip>
            )}

          <WorkFlowActions
            status={item.status}
            conclusion={
              item.lastRunId !== undefined
                ? item.conclusion
                : StatusWorkflowEnum.default
            }
            workflowId={item.id}
            parameters={item.parameters ?? []}
          />
        </Box>
      ),
      source: (
        <Box className={source}>
          <LanguageIcon />
          <Link to={item.source ?? ''} title="Visite workflow" target="_blank">
            {truncateString(item.source as string, 40)}
          </Link>
        </Box>
      ),
      logs: (
        <>
          {
            item.status === StatusWorkflowEnum.inProgress ||
            item.status === StatusWorkflowEnum.queued ? (
              <Tooltip title="Please wait the workflow run" placement="bottom">
                <Timer
                  className={clickable}
                  color="disabled"
                  style={{ cursor: 'wait' }}
                />
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  item.lastRunId ? 'Last run Logs...' : 'First, run the workflow!'
                }
                placement="bottom"
              >
                <DescriptionIcon
                  className={clickable}
                  onClick={() => {
                    if (!item.lastRunId) return;
                    handleCICDLogs(item.lastRunId!.toString());
                  }}
                  color={item.lastRunId ? 'primary' : 'disabled'}
                />
              </Tooltip>
            )
          }
        </>
      ),
    };
  });

  const TitleBar = (
      <>
        <Typography className={title}>
          <GithubIcon/>
          All Workflows
        </Typography>
        <Box role="combobox" className={options}>
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

const WorkflowTable = () => {

  const { entity } = useEntity();
  const { projectName, hostname } = useEntityAnnotations(entity as Entity);
  const [ loadingState, setLoadingState ] = useState(true);
  const { branch, listAllWorkflows, workflowsState, setWorkflowsState } = useGithuWorkflowsContext();

  const updateData = async ()=> {
    const data = await listAllWorkflows(hostname,projectName);
    setWorkflowsState(data as WorkflowResultsProps[])
  }
  
  const { loading, error } = useAsync(async (): Promise<void> => {
    updateData();
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      setLoadingState(false)
    },2000)
  },[])

  useEffect(()=>{
    updateData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[branch]);


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
          href={`https://${hostname}/${projectName}/actions/new`}
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

export default memo(WorkflowTable)