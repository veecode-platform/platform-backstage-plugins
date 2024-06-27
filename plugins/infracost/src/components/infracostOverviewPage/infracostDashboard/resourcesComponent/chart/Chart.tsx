import React from 'react'
import { ChartProps } from './types'
import { PieChart } from '@mui/x-charts/PieChart';

export const Chart : React.FC<ChartProps> = (props) => {

 const { items } = props;
 const chartItems = (items.length === 1 && items[0].value === 0) ? [{id: items[0].id, label: items[0].label, value: 0.001}] : items;

  return (
      <PieChart
        series={[
          {
            data: chartItems,
            innerRadius: 50,
            highlightScope: { faded: 'global', highlighted: 'item' },
          }
        ]}
        height={250}
        // slotProps={{
        //   legend: { 
        //       hidden: false
        //    },
        // }}
        margin={{ top: 0, bottom: 0, left: 0, right: 200 }}
      />
  );
}
