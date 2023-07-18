import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableColumn,
  Progress,
  ResponseErrorPanel,
  StatusError,
  StatusAborted,
  StatusOK,
  StatusPending,
  StatusRunning,
  StatusWarning } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import SyncIcon from '@material-ui/icons/Sync';
import ReplayIcon from '@material-ui/icons/Replay';
import TimerIcon from '@material-ui/icons/Timer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LanguageIcon from '@material-ui/icons/Language';
import FilterListIcon from '@material-ui/icons/FilterList';
import { StatusWorkflowEnum } from '../../utils/enums/WorkflowListEnum';
import { WorkflowListExample } from '../../mocks/WorkflowListExample';

const useStyles = makeStyles(theme => ({
  title:{
    paddingLeft: '2rem',
    fontSize: '1.5rem'
  },
  button:{
    position: 'absolute',
    top: '20%',
    right: '2%',
    padding: '.5rem 2rem',
    background: 'transparent',
    border: `1px solid ${theme.palette.border}`,
    borderRadius: '30px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: theme.palette.border
  },
  action: {
    width: '90%',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  url: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  }
}));

type Item = {
    id: string,
    name: string,
    status: string,
    url: string,
};

type DenseTableProps = {
  items: Item[];
};

export const DenseTable = ({ items }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name',  width:'1fr', align:'center'},
    { title: 'Status', field: 'status', width:'1fr', align:'center' },
    { title: 'Action', field: 'action', width:'1fr', align:'center' },
    { title: 'Url', field: 'url', width:'1fr', align:'center'},
  ];

  const data = items.map(item => {
    return {
      name: item.name,
      status: (
        <>
         {item.status === StatusWorkflowEnum.completed && <StatusOK>{item.status}</StatusOK>}
         {item.status === StatusWorkflowEnum.error && <StatusError>{item.status}</StatusError>}
         {item.status === StatusWorkflowEnum.pending && <StatusPending>{item.status}</StatusPending>}
         {item.status === StatusWorkflowEnum.aborted && <StatusAborted>{item.status}</StatusAborted>}
         {item.status === StatusWorkflowEnum.running && <StatusRunning>{item.status}</StatusRunning>}
         {item.status === StatusWorkflowEnum.warning && <StatusWarning>{item.status}</StatusWarning>}
        </>
        ),
      action: (
        <div className={classes.action}>
          {item.status === StatusWorkflowEnum.completed && <SyncIcon/>}
          {item.status === StatusWorkflowEnum.error && <ReplayIcon/>}
          {item.status === StatusWorkflowEnum.pending && <TimerIcon/>} 
          {item.status === StatusWorkflowEnum.aborted && <HighlightOffIcon/>}
          {item.status === StatusWorkflowEnum.running && <HourglassEmptyIcon/>} 
          {item.status === StatusWorkflowEnum.warning && <ErrorOutlineIcon/>}
        </div>
      ),
      url: (
        <div className={classes.url}>
            <LanguageIcon/> <a href={item.url} title='Visite workflow' target="_blank">{item.url}</a>
         </div>
         ),
    };
  });

  const TitleBar = (
      <>
        <span className={classes.title}>All Workflows</span>
        <button className={classes.button}>Logs <FilterListIcon/></button>
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

export const WorkflowList = () => {

  const { value, loading, error } = useAsync(async (): Promise<Item[]> => {
    // Would use fetch in a real world example
    return WorkflowListExample.results;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable items={value || []} />;
};
