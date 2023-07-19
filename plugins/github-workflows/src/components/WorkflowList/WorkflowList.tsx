import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableColumn,
  Progress,
  ResponseErrorPanel
 } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import LanguageIcon from '@material-ui/icons/Language';
import FilterListIcon from '@material-ui/icons/FilterList';
import { WorkflowListExample } from '../../mocks/WorkflowListExample';
import { WorkFlowStatus } from '../WorkFlowStatus';
import { WorkFlowActions } from '../WorkFlowActions';
import { Box } from '@material-ui/core';

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
  source: {
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
    conclusion: string,
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
    { title: 'Source', field: 'source', width:'1fr', align:'center'},
  ];

  const data = items.map(item => {
    return {
      name: item.name,
      status: (
        <WorkFlowStatus
          status={item.status}
          conclusion={item.conclusion ?? null}
         />
        ),
      action: (
        <Box className={classes.action}>
          <WorkFlowActions
            status={item.status}
            conclusion={item.conclusion ?? null}
         />
        </Box>
      ),
      source: (
        <Box className={classes.source}>
            <LanguageIcon/> <a href={item.url} title='Visite workflow' target="_blank">{item.url}</a>
         </Box>
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
