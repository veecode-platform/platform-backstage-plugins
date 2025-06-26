import React from 'react';
import { ModalComponentProps, ResourceDetailsComponentProps } from './types';
import {
  useModalComponentStyles,
  useResourceDetailsComponentStyles,
} from './styles';
import {
  Box,
  Chip,
  Fade,
  IconButton,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CircleCloseIcon, Wrapper } from '../../../../shared';
import { Chart } from '../chart';
import { Table } from '../../../../shared/table';
import {
  CostComponent,
  Resource,
  SubResource,
} from '@veecode-platform/backstage-plugin-infracost-common';
import {
  addItem,
  addRow,
  initialResourceDetailsChartState,
  initialResourceDetailsTableState,
  resourceDetailsChartReducer,
  resourceDetailsTableReducer,
} from './state';

const ResourceDetailsComponent: React.FC<
  ResourceDetailsComponentProps
> = props => {
  const [resourceTableState, resourceTableDispatch] = React.useReducer(
    resourceDetailsTableReducer,
    initialResourceDetailsTableState,
  );
  const [resourceChartState, resourceChartDispatch] = React.useReducer(
    resourceDetailsChartReducer,
    initialResourceDetailsChartState,
  );
  const { resourceName, labelProps, resource } = props;
  const { title, details, chartStyles, tableStyles } =
    useResourceDetailsComponentStyles();

  const generateResourceData = (resourceValue: Resource) => {
    if (resourceValue.costComponents) {
      const costComponents: CostComponent[] = resource.costComponents;
      costComponents.map(costComponent => {
        if (costComponent.usageBased) {
          // resourceChartDispatch(addItem({label: `${costComponent.name}*`, value: 0}));
          resourceTableDispatch(
            addRow({
              id: costComponent.name,
              monthly_qty: `${Number(costComponent.price).toFixed(2)} per ${
                costComponent.unit
              }`,
              monthly_cost: 'Depends on usage*',
            }),
          );
        } else if (
          costComponent.monthlyCost &&
          costComponent.monthlyCost !== '0'
        ) {
          const monthlyCost = Number(costComponent.monthlyCost).toFixed(2);
          resourceChartDispatch(
            addItem({ label: costComponent.name, value: Number(monthlyCost) }),
          );
          resourceTableDispatch(
            addRow({
              id: costComponent.name,
              monthly_qty: `${costComponent.monthlyQuantity} ${costComponent.unit}`,
              monthly_cost: `$ ${monthlyCost ?? '0'}`,
            }),
          );
        }
      });
    }
    if (resourceValue.subresources) {
      const subResources: SubResource[] = resource.subresources;
      subResources.map(subresource => {
        const costComponents: CostComponent[] = subresource.costComponents;
        costComponents.map(costComponent => {
          if (costComponent.usageBased) {
            resourceChartDispatch(
              addItem({ label: `${costComponent.name}*`, value: 0 }),
            );
            resourceTableDispatch(
              addRow({
                id: costComponent.name,
                monthly_qty: `${costComponent.price} per ${costComponent.unit}`,
                monthly_cost: 'Depends on usage*',
              }),
            );
          } else if (
            costComponent.monthlyCost &&
            costComponent.monthlyCost !== '0'
          ) {
            const monthlyCost = Number(costComponent.monthlyCost).toFixed(2);
            resourceChartDispatch(
              addItem({
                label: costComponent.name,
                value: Number(monthlyCost),
              }),
            );
            resourceTableDispatch(
              addRow({
                id: costComponent.name,
                monthly_qty: `${costComponent.monthlyQuantity} ${costComponent.unit}`,
                monthly_cost: `$ ${monthlyCost ?? '0'}`,
              }),
            );
          }
        });
      });
    }
  };

  React.useEffect(() => {
    generateResourceData(resource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  return (
    <Wrapper styles={{ width: '100%', position: 'relative' }}>
      <div className={title}>
        <Chip variant="outlined" label={resourceName} />
      </div>
      <div className={details}>
        <div className={chartStyles}>
          <Chart items={resourceChartState} />
        </div>
        <div className={tableStyles}>
          <Table labels={labelProps} data={resourceTableState} />
        </div>
      </div>
    </Wrapper>
  );
};

export const ModalComponent: React.FC<ModalComponentProps> = props => {
  const { show, handleCloseModal, resources } = props;
  const {
    modalOnBlur,
    modalContent,
    modalHeader,
    closeModal,
    modalBody,
    container,
    titleBar,
    content,
  } = useModalComponentStyles();
  const labelProps = ['Name', 'monthly_qty', 'monthly_cost'];

  // eslint-disable-next-line no-console
  console.log(resources);

  return (
    <Modal
      open={show}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-job-details"
      aria-describedby="modal-modal-jobs-details-and-steps"
      className={modalOnBlur}
      closeAfterTransition
    >
      <Fade in={show}>
        <Box className={modalContent}>
          <div className={modalBody}>
            <Paper className={container}>
              <Box className={titleBar}>
                <Typography variant="h6">Resources</Typography>
                <div className={modalHeader}>
                  <Tooltip title="Close">
                    <IconButton onClick={handleCloseModal}>
                      <CircleCloseIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </Box>
              <div className={content}>
                {resources.map(resource => (
                  <ResourceDetailsComponent
                    key={resource.name}
                    resourceName={resource.name}
                    labelProps={labelProps}
                    resource={resource}
                  />
                ))}
              </div>
            </Paper>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
