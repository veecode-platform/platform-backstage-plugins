import React from 'react'
import { ChartProps } from './types'
import { PieChart } from '@mui/x-charts/PieChart';

export const Chart : React.FC<ChartProps> = (props) => {

 const { items } = props;
  return (
      <PieChart
        series={[
          {
            data: items,
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
