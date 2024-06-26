import React from 'react'
import { InfracostDashboardProps } from './types'
import { useInfracostDashboardStyles } from './styles';
import { Typography } from '@material-ui/core';
import { Project } from '@veecode-platform/backstage-plugin-infracost-common';
import { Wrapper } from '../../shared';
import { Overall } from './overall';
import { Summary } from './summary';
import { ResourcesComponent } from './resourcesComponent';

export const InfracostDashboard : React.FC<InfracostDashboardProps> = (props) => {

    const {estimate} = props;
    const {root, details} = useInfracostDashboardStyles();
    const project = estimate.projects[0] as Project;

  return (
    <div className={root}>
      <Wrapper>
        <Typography variant="body1">Project: <strong>{estimate.name}</strong> </Typography>
      </Wrapper>
      <Wrapper>
        <ResourcesComponent 
          resources={project.breakdown.resources}
          />
      </Wrapper>
      <Wrapper>
        <div className={details}>
          <Overall
             totalMonthlyCost={project.breakdown.totalMonthlyCost}
             projectName={project.name}
             baselineCost={project.breakdown.totalMonthlyCost}
             usageCost={project.breakdown.totalMonthlyUsageCost}
            />
          <Summary
           resourcesCount={project.summary.totalDetectedResources}
           usageBasedResources={project.summary.totalUsageBasedResources }
           noPriceResources={project.summary.totalNoPriceResources}
          />
        </div>
      </Wrapper>
    </div>
  )
}
