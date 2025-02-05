import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link, Table,TableColumn} from '@backstage/core-components';
import { Box, Fade, IconButton, Tooltip } from '@material-ui/core';
import { HtmlTooltip } from '../../shared';
import MoreIcon from '@material-ui/icons/More';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { ConfirmDeleteDialog } from '../ConfirmDeleteDialog/ConfirmDeleteDialog';
import { TableComponentProps, TableData } from './types';
import { tableStyle, useTableComponentStyle } from './styles';
import { kongRouteDeletePermission, kongUpdateRoutePermission, RoutesResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { usePermission } from '@backstage/plugin-permission-react';
import { useKongServiceManagerContext } from '../../../context';


export const TableComponent : React.FC<TableComponentProps> = (props) => {

  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [routeId, setRouteId] = React.useState<string>();
  const { removeRoute } = useKongServiceManagerContext();
  const {tooltipContent, label ,tags, actions} = useTableComponentStyle();
  const {isLoading,dataProps, handleEditModal, refreshList} = props;
  const { loading: loadingUpdateRoutePermission, allowed: canUpdateRoute } = usePermission({
    permission: kongUpdateRoutePermission,
  });
  const { loading: loadingDeleteRoutePermission, allowed: canDeleteRoute } = usePermission({
    permission: kongRouteDeletePermission,
  });


  const handleOpenDialog = (routeIdParams: string) => {
    setRouteId(routeIdParams);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

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
  
  const handleRemoveRoute = async () => {
    if (!routeId) return;
    await removeRoute();
    refreshList();
    handleCloseDialog();
  }

  const columns: TableColumn[] = [
    {
      id: 'name',
      title: 'Name',
      field: 'name',
      highlight: true,
      type: 'string',
      align: 'center',
      width: '1fr',
      render: (row:Partial<TableData>) => (
        <Tooltip title={row.id!}>
          <Link to={row.id!} className={label}>
          {row.name}
        </Link>
        </Tooltip>
      )
    },
    {
      id: 'protocols',
      title: 'Protocols',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          {(row.protocols && row.protocols.length)
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
          {(row.methods && row.methods.length > 0 )
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
          {(row.hosts && row.hosts.length > 0)
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
          {(row.paths && row.paths.length > 0)
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
                {(row.tags && row.tags.length > 0) ? row.tags.map(tag => (
                  <Chip key={tag} label={tag} />
                )): <Typography variant="caption" color="textPrimary">No Tags ...</Typography>}
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
    {
      id: 'actions',
      title: 'Actions',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <div className={actions}>
           {!loadingUpdateRoutePermission && (
           <IconButton 
             aria-label="Edit" 
             title="Edit Route" 
             onClick={() => handleEditModal?.(row)}
             disabled={!canUpdateRoute}
             >
            <Edit/>
          </IconButton>)}
          {!loadingDeleteRoutePermission && (
          <IconButton 
           aria-label="Delete" 
           title="Delete Route" 
           onClick={() => handleOpenDialog(row.id as string) }
           disabled={!canDeleteRoute}
           >
            <DeleteIcon />
          </IconButton>)}
        </div>
      ),
      align: 'center',
      width: '1fr',
    }
  ];

  return (
      <>
        <Table
          isLoading={isLoading}
          options={{ 
            paging: true, 
            padding: 'dense',
            minBodyHeight:'55vh',
            paginationType:'stepped', 
            paginationPosition:'bottom',
            pageSize: 10, 
            pageSizeOptions: [5, 10, 20, 50],
           }}
          data={generateData(dataProps)}
          columns={columns}
          title=""
          style={tableStyle}
        />
        <ConfirmDeleteDialog show={showDialog} handleClose={handleCloseDialog} handleSubmit={handleRemoveRoute}/>
      </>
  );
};