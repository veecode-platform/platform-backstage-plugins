import React from 'react';
import { Box, Card, CardContent, CardHeader, CircularProgress, IconButton, Paper, Typography } from '@material-ui/core';
import { WorkFlowItem } from './WorkFlowItem';
import CachedIcon from '@material-ui/icons/Cached';
import { StatusWorkflowEnum } from '../../../utils/enums/WorkflowListEnum';
import GithubIcon from '../../../assets/GithubIcon';
import { useWorkflowCardStyles } from './styles';
import { CardsProps } from './types';
import SelectBranch from '../../SelectBranch/SelectBranch';
import { useGithuWorkflowsContext } from '../../../context';


const WorkFlowCard : React.FC<CardsProps> = (props) => {

  const [ loading, setLoading] = React.useState<boolean>(false);
  const {title, options, buttonRefresh,workflowsGroup,loadingComponent,info} = useWorkflowCardStyles();
  const { branch } = useGithuWorkflowsContext();
  const { items, updateData } = props;

  const refresh = async ()=> {
    setLoading(true)
    await updateData()
    setTimeout(()=> setLoading(false), 1500);
  }

  React.useEffect(()=>{
    updateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[branch])

  const TitleBar = (
    <>
      <Typography className={title}>
        <GithubIcon/>
        Workflows
      </Typography>
    </>
  );

  const ActionsCard = (
    <Box className={options}>
      <SelectBranch/>
      <IconButton
        aria-label="Refresh"
        title="Refresh"
        onClick={() => refresh()}
        className={buttonRefresh}
      >
        <CachedIcon />
      </IconButton>
    </Box>
  )


  return (
    <Paper>
      <Card>
        <CardHeader
          title={TitleBar} 
          action={ActionsCard}
         />
         <CardContent className={workflowsGroup}>
          {loading ?
            (<Box className={loadingComponent}> <CircularProgress />  </Box>) :
            (
              <>
                {
                  items.length === 0 ? <div className={info}>No records to display</div> : (
                    items.map(item =>
                      (<WorkFlowItem
                        id={item.id!}
                        key={item.id}
                        status={item.status}
                        conclusion={item.lastRunId !== undefined ? item.conclusion : StatusWorkflowEnum.default}
                        workflowName={item.name as string}
                        parameters={item.parameters}
                        lastRunId={item.lastRunId?.toString()}
                      />)
                    )
                  )
                }
              </>
            )
          }
        </CardContent>
      </Card>
    </Paper>
  )
}

export default React.memo(WorkFlowCard)