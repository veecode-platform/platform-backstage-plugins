import React from 'react';
import { Table, TableColumn, Link } from '@backstage/core-components';
import LanguageIcon from '@material-ui/icons/Language';
import { WorkFlowActions } from '../WorkFlowActions';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { WorkflowDispatchParameters } from '../../../utils/types';
import { truncateString } from '../../../utils/helpers';
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
import { WorkflowTableProps } from './types';
import SelectBranch from '../../SelectBranch/SelectBranch';
import { IoOpenOutline } from "react-icons/io5";
import { WorkFlowStatus } from '../WorkFlowStatus';


const WorkflowTable : React.FC<WorkflowTableProps> = (props) => {
  
  const [ showModal, setShowModal ] = React.useState<boolean>(false);
  const [parametersState, setParametersState] = React.useState<WorkflowDispatchParameters[]|null>(null)
  const [ loading, setLoading] = React.useState<boolean>(false);
  const { entity } = useEntity();
  const { projectName, hostname } = useEntityAnnotations(entity as Entity);
  const navigate = useNavigate();
  const {action,source,clickable,title,options,name} = useWorkflowTableStyles();
  const { items, updateData} = props;

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

export default React.memo(WorkflowTable)