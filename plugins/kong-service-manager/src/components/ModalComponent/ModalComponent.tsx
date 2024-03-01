import { Box, Modal, Typography, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { KongServiceManagerContext } from '../context';

const useStyle = makeStyles(theme=>({
  modalWrapper:{
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  modalBox:{
    width:'75vw',
    borderRadius: '8px',
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    background: theme.palette.background.paper
  }
}));

export const ModalComponent = () => {

  const { openModal, handleToggleModal } = useContext(KongServiceManagerContext);
  const { modalWrapper,modalBox } = useStyle();
  


  return (
    <Modal
      open={openModal}
      onClose={handleToggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={modalWrapper}
    >
      <Box className={modalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
         "teste"
        </Typography>
        <Typography id="modal-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
};
