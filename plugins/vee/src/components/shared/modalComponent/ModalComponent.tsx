import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ModalComponentProps } from "./types";
import { useModalComponentStyles } from "./styles";
import { MdClose } from "react-icons/md";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import  Backdrop from "@mui/material/Backdrop";

export const ModalComponent : React.FC<ModalComponentProps> = (props) => {

    const { title, open, handleClose, children } = props;
    const { modalOnBlur,modalContent,modalBody,container,titleBar,titleContent,modalHeader,closeModal,content } = useModalComponentStyles();

    return (
        <>
         <Modal
            keepMounted
            open={open}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={modalOnBlur}
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500
              },
        }}
        >
         <Fade in={open}>
          <Box className={modalContent}>
            <div className={modalBody}>
            <Paper className={container}>
              <Box className={titleBar}>
                <Typography
                  variant="h6"
                  className={titleContent}
                  id="modal-title"
                >{title}</Typography>
                <div className={modalHeader}>
                  <Tooltip title="Close">
                    <MdClose
                      size={32}
                      className={closeModal}
                      onClick={handleClose}
                    />
                  </Tooltip>
                </div>
              </Box>
              <div className={content}>
                {children}
              </div>
            </Paper>
          </div>
          </Box>
         </Fade>
        </Modal>
       </>
    )
}