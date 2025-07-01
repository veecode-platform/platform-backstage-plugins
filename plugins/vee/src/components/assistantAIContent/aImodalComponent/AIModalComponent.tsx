import React from 'react';
import { useAIModalComponentStyles } from './styles';
import { AIModalComponentProps } from './types';
import { Box, Fade, IconButton, Modal, Tooltip } from '@material-ui/core';
import { AIContent } from './aIContent';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../../hooks/useEntityAnnotation';
import { useVeeContext } from '../../../context';
import { CircleCloseIcon } from '../../shared';

export const AIModalComponent: React.FC<AIModalComponentProps> = props => {
  const { show, toggleDialog } = props;
  const { modalOnBlur, modalContent, modalHeader, closeModal, modalBody } =
    useAIModalComponentStyles();
  const { entity } = useEntity();
  const { location, projectName, engine } = useEntityAnnotation(entity);
  const { clearHistory } = useVeeContext();

  const handleCloseModal = () => {
    clearHistory();
    toggleDialog();
  };

  return (
    <Modal
      open={show}
      onClose={toggleDialog}
      aria-labelledby="modal-modal-job-details"
      aria-describedby="modal-modal-jobs-details-and-steps"
      className={modalOnBlur}
      closeAfterTransition
    >
      <Fade in={show}>
        <Box className={modalContent}>
          <div className={modalHeader}>
            <Tooltip title="Close">
              <IconButton onClick={handleCloseModal}>
                <CircleCloseIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={modalBody}>
            <AIContent
              engine={engine!}
              location={location!}
              projectName={projectName!}
              toggleDialog={handleCloseModal}
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
