import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {
  Table,
  TableColumn} from '@backstage/core-components';
import { RoutesResponse } from '../../../utils/types';
import { Box, Fade, makeStyles } from '@material-ui/core';
import { HtmlTooltip } from '../../shared';
import MoreIcon from '@material-ui/icons/More';

interface TableComponentProps {
  dataProps: RoutesResponse[] | []
}  

interface TableData {
  id: string,
  name: string,
  protocols: string[],
  methods: string[],
  hosts: string[],
  paths: string[],
  tags: string[]
}

const useStyle = makeStyles({
  tooltipContent:{
    width: '100%'
  },
  tags: {
    cursor: 'pointer',
  }
})

export const TableComponent = ({dataProps}:TableComponentProps) => {

  const {tooltipContent, tags} = useStyle();

  const generateData = (rowData: RoutesResponse[] | [] | null) => {
    const data: Array<TableData> = [];
    if(rowData){
      rowData.map(r => {
        data.push({
          id: r.name,
          name: r.name,
          protocols: r.protocols,
          methods: r.methods,
          hosts: r.hosts,
          paths: r.paths,
          tags: r.tags
        });
      })   
    }
    return data;
  };
  
  const columns: TableColumn[] = [
    {
      id: 'name',
      title: 'Name',
      field: 'name',
      highlight: true,
      type: 'string',
      align: 'center',
      width: '1fr',
    },
    {
      id: 'protocols',
      title: 'Protocols',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {row.protocols
            ? row.protocols.map(protocol => (
                <Typography variant="body2" key={protocol}>
                  {protocol}
                </Typography>
              ))
            : ' - '}
        </>
      ),
      align: 'center',
      width: '1fr',
    },
    {
      id: 'methods',
      title: 'Methods',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {row.methods
            ? row.methods.map(method => (
                <Typography variant="body2" key={method}>
                  {method}
                </Typography>
              ))
            : ' - '}
        </>
      ),
      align: 'center',
      width: '1fr',
    },
    {
      id: 'hosts',
      title: 'Hosts',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {row.hosts
            ? row.hosts.map(host => (
                <Typography variant="body2" key={host}>
                  {host}
                </Typography>
              ))
            : ' - '}
        </>
      ),
      align: 'center',
      width: '1fr',
    },
    {
      id: 'paths',
      title: 'Paths',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {row.paths
            ? row.paths.map(path => (
                <Typography variant="body2" key={path}>
                  {path}
                </Typography>
              ))
            : ' - '}
        </>
      ),
      align: 'center',
      width: '1fr',
    },
    {
      id: 'tags',
      title: 'Tags',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <HtmlTooltip
          arrow
          placement="bottom"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={
              <Box className={tooltipContent}>
                {row.tags ? row.tags.map(tag => (
                  <Chip key={tag} label={tag} />
                )): 'No tags'}
              </Box>
          }
        >
          <div className={tags}>
          <MoreIcon/> 
          </div>
        </HtmlTooltip>
      ),
      align: 'center',
      width: '1fr',
    },
  ];

  return (
      <Table
        options={{ paging: true, padding: 'dense',minBodyHeight:'55vh',paginationType:'stepped', paginationPosition:'bottom' }}
        data={generateData(dataProps)}
        columns={columns}
        title=""
        style={{marginTop: '-2rem', width: '100%', height:'100%'}}
      />
  );
};