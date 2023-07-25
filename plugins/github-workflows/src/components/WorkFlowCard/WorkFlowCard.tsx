import React, { useContext } from 'react';
import { InfoCard, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import useAsync from 'react-use/lib/useAsync';

const useStyles = makeStyles(theme => ({
  title:{
    paddingLeft: '1.5rem',
    fontSize: '1.5rem'
  },
  workflowsGroup:{
      width: '95%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '2rem 1rem',
      gap: '1.5rem',
      overflow: 'auto',
      '&::-webkit-scrollbar' : {
        width: '10px',
        height: '4px'
      },
      '&::-webkit-scrollbar-thumb' : {
        borderRadius: '50px',
        background: theme.palette.grey[600],

      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
        height: '2px'
      }
  },

}));

type WorkFlowCardProps = {
  workFlowId:number,
  lastRunId: number,
  status: string,
  workFlowName: string
}

type CardsProps = {
  items: WorkFlowCardProps[] | []
}

export const Cards = ({items}:CardsProps) => {
  
  const classes = useStyles();

  const TitleBar = (
    <>
      <Typography className={classes.title}>Workflows</Typography>
    </>
    )

  return (
    <Paper>
      <InfoCard title={TitleBar}>
        <Box className={classes.workflowsGroup}>
          { items.map( item => 
          <WorkFlowItem 
            key={item.workFlowId} 
            status={item.status}
            workflowName={item.workFlowName}
            />)
          }
          {/* <WorkFlowItem status="warning" conclusion="" workflowName="Build-image"/>
          <WorkFlowItem status="pending" conclusion="" workflowName="Deploy-project"/> */}
        </Box>
      </InfoCard>
    </Paper>
  )
}

export const WorkFlowCard = () => {

  const { workflowByAnnotation } = useContext(GithubWorkflowsContext);
  
  const { value, loading, error } = useAsync(async (): Promise<WorkFlowCardProps[] | []> => {
    const workflowsByAnnotationResult = await workflowByAnnotation();

    const data = workflowsByAnnotationResult.map(
      w => {
        return {
                    workFlowId: w.id as number,
                    lastRunId: w.lastRunId as number,
                    status: w.status as string,
                    workFlowName: w.name as string
               }
      }
    )

      return  data || []
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <Cards items={value || []} />;
};