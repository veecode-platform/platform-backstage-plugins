import React from 'react'
import { ChartProps } from './types'
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@material-ui/core';

export const Chart : React.FC<ChartProps> = (props) => {

 const { items } = props;
 const chartItems = (items.length === 1 && items[0].value === 0) ? [{id: items[0].id, label: items[0].label, value: 0.001}] : items;
 const size = {height: 450}

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <PieChart
        series={[
          {
            data: chartItems,
            innerRadius: '50%',
            highlightScope: { faded: 'global', highlighted: 'item' },
          },
        ]}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
            labelStyle:{
              fontSize: 14
            },
            itemMarkWidth: 11,
            itemMarkHeight: 10,
          },
        }}
        margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
        {...size}
      />
    </Box>
  );
}
