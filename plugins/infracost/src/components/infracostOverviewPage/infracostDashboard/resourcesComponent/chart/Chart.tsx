import React from 'react';
import { ChartProps } from './types';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@material-ui/core';
import { BiShow } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";
import { useChartStyles } from './styles'; 

export const Chart: React.FC<ChartProps> = (props) => {
  const { items, overview } = props;
  const [isLegendVisible, setIsLegendVisible] = React.useState<boolean>(overview  ? false : true);
  const { root, btn ,blur} = useChartStyles();

  const chartItems =
    items.length === 0
      ? [{ id: 0, label: 'Costs are based on usage*', value: 0.001, color: 'grey' }]
      : items;

  const toggleLegend = () => {
    setIsLegendVisible((prev) => !prev);
  };

  return (
    <Box className={`${root} ${isLegendVisible ? blur : null}`}>
      <button
        onClick={toggleLegend}
        className={btn}
        title={isLegendVisible ? "Hide Legends" : "Show Legends"}
      >
        {isLegendVisible ? <BiShow /> : <GoEyeClosed />}
      </button>

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
            hidden: !isLegendVisible, 
            direction: 'column',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
            labelStyle: {
              fontSize: '12px',
            },
            itemMarkWidth: 11,
            itemMarkHeight: 10,
          },
        }}
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        height={500}
      />      
    </Box>
  );
};
