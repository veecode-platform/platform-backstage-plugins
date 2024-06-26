import React from 'react'
import { ResourcesComponentProps } from './types'
import { useResourcesComponentStyles } from './styles';
import { Resource } from '@veecode-platform/backstage-plugin-infracost-common';
import { initialChartState, chartReducer } from './state/chart/reducer';
import { addItem } from './state/chart/actions';
import { Chart } from './chart';
import { Table } from '../../../shared/table';
import { initialResourcesTableState, resourcesTableReducer } from './state/table/reducer';
import { addRow } from './state/table/actions';

export const ResourcesComponent : React.FC<ResourcesComponentProps> = (props) => {

  const [chartState, chartDispatch] = React.useReducer(chartReducer,initialChartState);
  const [tableState, tableDispatch] = React.useReducer(resourcesTableReducer,initialResourcesTableState);
  const { resources } = props;
  const { root, chartStyles, tableStyles } = useResourcesComponentStyles();
  const labelProps = ['Name','monthly_cost']
  
  const generateResourceData = (resourcesValue: Resource[]) => {
     resourcesValue.map((resource) => {
        tableDispatch(addRow({id: resource.name, monthly_cost: resource.monthlyCost ? `$ ${Number(resource.monthlyCost).toFixed(2)}` : 'Depends on usage*'}))
        if(resource.monthlyCost){
          const monthlyCost = Number(resource.monthlyCost)
          chartDispatch(addItem({label: resource.name, value: Number(monthlyCost.toFixed(2))}))
        }
        // if(!resource.monthlyCost || resource.monthlyCost === '0'){
        //   chartDispatch(addItem({label: resource.name, value: 0}))
        // }
     })
      
  };
  
  React.useEffect(()=>{
    generateResourceData(resources)
  },[resources]);

  return (
    <div className={root}>
      <div className={chartStyles}>
        <Chart items={chartState}/>
      </div>
      <div className={tableStyles}>
        <Table 
         labels={labelProps} 
         data={tableState}/>
      </div>
    </div>
  )
}
