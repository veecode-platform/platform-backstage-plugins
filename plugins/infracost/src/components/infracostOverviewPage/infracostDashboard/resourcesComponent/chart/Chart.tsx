import React from 'react'
import { ChartProps } from './types'
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@material-ui/core';

export const Chart : React.FC<ChartProps> = (props) => {

 const [ isHidden, setIsHidden ] = React.useState<boolean>(false);
 const { items } = props;
 const chartItems = (items.length === 0) ? [{id: 0, label: 'Costs are based on usage*', value: 0.001, color:'grey'}] : items;
 const size = {height: 450}

 const handleResize = () => {
  if(window && window.innerWidth < 950) setIsHidden(true);
  else setIsHidden(false);
 }

 React.useEffect(()=>{
  window.addEventListener('resize', handleResize);
  handleResize();
  // clean up state
  return () => {
    window.removeEventListener('resize',handleResize)
  }
 },[])

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
            hidden: isHidden,
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
