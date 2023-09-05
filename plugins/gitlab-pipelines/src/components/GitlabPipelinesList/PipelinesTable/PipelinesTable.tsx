import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableColumn,
  Progress,
  ResponseErrorPanel,
  Link,
  EmptyState,
  MissingAnnotationEmptyState
 } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import LanguageIcon from '@material-ui/icons/Language';
import { Box, Button, Typography } from '@material-ui/core';
import { SelectBranch } from '../../SelectBranch';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import SyncIcon from '@material-ui/icons/Sync';
// import { entityMock } from '../../../mocks/component';
import { GitlabPipelinesContext } from '../../context/GitlabPipelinesContext';
import { truncateString } from '../../../utils/commons';
import { StatusComponent } from '../../StatusComponent';
import { Pipeline } from '../../../utils/types';
import { PipelineActions } from '../PipelineActions';
import { GITLAB_ANNOTATION, useEntityAnnotations, isGitlabAvailable } from '../../../hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import GitlabIcon from '../../assets/gitlabIcon';
dayjs.extend(relativeTime);
dayjs.extend(duration);


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
    justifyContent: 'center',
    gap: '1rem',
    color: theme.palette.border,
  },
  item: {
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
  action:{
    height: "100%",
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center"
  }
}));

type DenseTableProps = {
  items: Pipeline[] | [];
};

export const DenseTable = ({ items }: DenseTableProps) => {
  
  const { entity } = useEntity();
  const [ loading, setLoading] = useState<boolean>(false);
  const { projectName } = useEntityAnnotations(entity as Entity);
  const { listAllPipelines, setPipelineListState } = useContext(GitlabPipelinesContext);
  const classes = useStyles();

  const updateData = async ()=> {
    setLoading(true)
    const data = await listAllPipelines(projectName);
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
        <Box role="select" className={classes.options}>
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

  const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entity as Entity);
  const [ loadingState, setLoadingState ] = useState(true);
  const { branch, listAllPipelines, pipelineListState} = useContext(GitlabPipelinesContext);

  useEffect(()=>{
    setTimeout(()=>{
      setLoadingState(false)
    },2000);
  },[])

  useEffect(()=>{
    updateData();
  },[branch]);

  const updateData = async ()=> {
    await listAllPipelines(projectName);
  }
  
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
          href={`https://gitlab.com/${projectName}`}
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
