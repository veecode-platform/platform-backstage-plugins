import React from 'react';
import { Table, TableColumn,Progress,ResponseErrorPanel,Link,EmptyState} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import LanguageIcon from '@material-ui/icons/Language';
import { Box, Button, Typography } from '@material-ui/core';
import { SelectBranch } from '../../SelectBranch';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import SyncIcon from '@material-ui/icons/Sync';
import { truncateString } from '../../../utils/helpers';
import { StatusComponent } from '../../StatusComponent';
import { Pipeline } from '../../../utils/types';
import { PipelineActions } from '../PipelineActions';
import {isGitlabAvailable } from '../../../hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import GitlabIcon from '../../../assets/gitlabIcon';
import { useGitlabPipelinesContext } from '../../../context';
import { usePipelinesTableStyles } from './styles';
import { DenseTableProps } from './types';
import { GITLAB_ANNOTATION } from '../../../utils/constants';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const DenseTable : React.FC<DenseTableProps> = (props) => {
  
  const [ loading, setLoading] = React.useState<boolean>(false);
  const { listAllPipelines, setPipelineListState } = useGitlabPipelinesContext();
  const classes = usePipelinesTableStyles();
  const { items } = props;

  const updateData = async ()=> {
    setLoading(true)
    const data = await listAllPipelines();
    setPipelineListState(data as Pipeline[]);
    setTimeout(()=> setLoading(false), 800)
  }

  const columns: TableColumn[] = [
    { title: 'Pipeline ID', field: 'pipelineID',  width:'1fr', align:'center'},
    { title: 'Status', field: 'status', width:'1fr', align:'center' },
    { title: 'Url', field: 'url', width:'1fr', align:'center'},
    { title: 'Created At', field: 'createdAt', width:'auto', align:'center'}
  ];

  const data = items.map(item => {
    return {
      id: item.id,
      pipelineID: (
        <Box className={classes.item}>
         {item.id}
        </Box>
        ),
      status: (
        <StatusComponent
          status={item.status}
         />
        ),
      url: (
        <Box className={classes.source}>
            <LanguageIcon/> 
            <Link to={item.webUrl ?? ''} title='Visite Pipeline' target="_blank">
              {truncateString(item.webUrl as string, 40)}
            </Link>
         </Box>
         ),
      createdAt:(
        <Box className={classes.item}>
          <time>{dayjs(item.createdAt.toString()).fromNow()}</time>
        </Box>
      )
    };
  });

  const TitleBar = (
      <>
        <Typography className={classes.title}>
          <GitlabIcon/>
          All Pipelines
        </Typography>
        <Box role="combobox" className={classes.options}>
            <SelectBranch/>
            <Box className={classes.action}>
              <PipelineActions 
                status={items[0].status}
               />
            </Box>
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
          tooltip: 'Reload Pipelines',
          isFreeAction: true,
          onClick: () => updateData(),
        },
      ]}
    />
  </>
  );
};

export const PipelinesTable = () => {

  const [ loadingState, setLoadingState ] = React.useState(true);
  const { hostname,projectName, entity, branch, listAllPipelines, pipelineListState } = useGitlabPipelinesContext();

  const updateData = async ()=> {
    await listAllPipelines();
  }

  React.useEffect(()=>{
    setTimeout(()=>{
      setLoadingState(false)
    },2000);
  },[])

  React.useEffect(()=>{
    updateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[branch]);

  
  const { loading, error } = useAsync(async (): Promise<void> => {
    updateData();
  }, []);


  if (loading) {
    return <Progress />;
  }

  if(!error && !pipelineListState) {
    return (
      <>
      { loadingState ? (<Progress />):(<EmptyState
      missing="data"
      title="No Pipeline Data"
      description="This component has Gittab.ci enabled, but no data was found. Have you created any Pipeline? Click the button below to create a new pipeline in CI-CD Tab."
      action={
        <Button
          variant="contained"
          color="primary"
          href={`https://${hostname}/${projectName}`}
        >
          Visit your repository
        </Button>
      }
    />)}
    </>
    )
  }

  if (!isGitlabAvailable(entity as Entity)) {
    return (
      <MissingAnnotationEmptyState annotation={GITLAB_ANNOTATION} />
    )
  }
  
  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <ErrorBoundary>
      <DenseTable 
       items={ pipelineListState || [] }
      />
    </ErrorBoundary>
  );
};
