import React from 'react'
import { useModalComponentStyles } from './styles';
import { ModalProps } from './types';
import { Box, Fade, Modal, Tooltip } from '@material-ui/core';
import { MdClose } from "react-icons/md";
import { ErrorMessageComponent } from './ErrorMessageComponent';
import { AnalysisComponent } from './AnalysisComponent';
import { LoadingProgress } from '../../../shared';


export const ModalComponent : React.FC<ModalProps> = (props) => {
    
    const [ loadingState, setLoadingState ] = React.useState<boolean>(true);
    const { errorTitle, errorMessage,solution,show, handleCloseModal } = props;
    const { modalOnBlur,modalContent, modalHeader,closeModal,modalBody,loadingContainer} = useModalComponentStyles();

    React.useEffect(()=>{
      setTimeout(()=>{setLoadingState(false)},1000)
    },[])
  
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
             <div className={modalHeader}>
                <Tooltip title="Close">
                  <MdClose 
                    size={32}
                    className={closeModal}
                    onClick={handleCloseModal}
                    />
                </Tooltip>
              </div>
            <div className={modalBody}>
              <ErrorMessageComponent 
                title={errorTitle}
                message={errorMessage}
               />
              { loadingState ? 
                 <div className={loadingContainer}>
                   <LoadingProgress/>
                 </div>
                : <AnalysisComponent solution={solution} />
              }
            </div>
          </Box>
        </Fade>
      </Modal>
    )
}
