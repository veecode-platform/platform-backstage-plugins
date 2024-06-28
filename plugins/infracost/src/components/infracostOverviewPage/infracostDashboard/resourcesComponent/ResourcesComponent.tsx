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
import { BiExpand } from "react-icons/bi";
import { Chip } from '@material-ui/core';
import { ModalComponent } from './modalComponent';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const ResourcesComponent : React.FC<ResourcesComponentProps> = (props) => {

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [chartState, chartDispatch] = React.useReducer(chartReducer,initialChartState);
  const [tableState, tableDispatch] = React.useReducer(resourcesTableReducer,initialResourcesTableState);
  const { timeGenerated, resources } = props;
  const { root, title, chartStyles, tableStyles,expandDetails } = useResourcesComponentStyles();
  const labelProps = ['Name','monthly_cost']
  
  const generateResourceData = (resourcesValue: Resource[]) => {
     resourcesValue.map((resource) => {
        tableDispatch(addRow({id: resource.name, monthly_cost: resource.monthlyCost ? `$ ${Number(resource.monthlyCost).toFixed(2)}` : 'Depends on usage*'}))
        if(resource.monthlyCost){
          const monthlyCost = Number(resource.monthlyCost)
          chartDispatch(addItem({label: resource.name, value: Number(monthlyCost.toFixed(2))}))
        }
     })   
  };

  const handleToggleModal = ()=> setShowModal(!showModal);
  
  React.useEffect(()=>{
    generateResourceData(resources)
  },[resources]);

  return (
    <>
      <div className={root}>
        <div className={title}>
          <Chip variant="outlined" label={`Generated to ${dayjs(timeGenerated).fromNow()}`}/>
        </div>
        <div className={chartStyles}>
          <Chart items={chartState} />
        </div>
        <div className={tableStyles}>
          <Table labels={labelProps} data={tableState} />
        </div>
        <div className={expandDetails} title="Expand Details">
          <BiExpand size="22" color="#B1B1B190" onClick={handleToggleModal}/>
        </div>
      </div>
      {showModal && <ModalComponent show={showModal} handleCloseModal={handleToggleModal} resources={resources}/>}
    </>
  );
}
