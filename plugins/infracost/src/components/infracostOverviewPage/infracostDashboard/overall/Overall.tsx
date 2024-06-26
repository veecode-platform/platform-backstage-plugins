import React from 'react'
import { useOverallStyles } from './styles';
import { Box } from '@material-ui/core';
import { Table } from '../../../shared/table/Table';
import { TotalCost } from './totalCost';
import { OverallProps, OverallTablePros } from './types';

export const Overall : React.FC<OverallProps> = (props) => {

  const {totalMonthlyCost, projectName, baselineCost, usageCost} = props;
  const { root, header } = useOverallStyles();
  const labelsProps = ['project','baseline_const', 'usage_cost'];
  const TableData : OverallTablePros[] = [{id: projectName, baseline_cost: Number(baselineCost).toFixed(0) ,usage_cost:`$ ${Number(usageCost).toFixed(0)}`}]

  return (
    <div className={root}>
      <Box className={header}>
        Overall total: <strong>${Number(totalMonthlyCost).toFixed(2) ?? '0'}</strong>
      </Box>
      <Table 
        labels={labelsProps} 
        data={TableData}
        />
      <TotalCost 
        total={Number(totalMonthlyCost).toFixed(2)}
        />
    </div>
  )
}
