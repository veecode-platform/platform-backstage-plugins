import React from "react";
import { useAIModalComponentStyles } from "./styles";
import { AIModalComponentProps } from "./types";
import { Box, Fade, Modal, Tooltip } from '@material-ui/core';
import { MdClose } from "react-icons/md";
import { ContentLayout, LoadingProgress } from "../../shared";

export const AIModalComponent : React.FC<AIModalComponentProps> = (props) => {
    
    const [ loadingState, setLoadingState ] = React.useState<boolean>(true);
    const { show, toggleDialog } = props;
    const { modalOnBlur,modalContent,modalHeader,closeModal,modalBody,loadingContainer } = useAIModalComponentStyles();

    React.useEffect(()=>{
        setTimeout(()=>{setLoadingState(false)},1000)
      },[])

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
                  <MdClose 
                    size={32}
                    className={closeModal}
                    onClick={toggleDialog}
                    />
                </Tooltip>
              </div>
            <div className={modalBody}>
              { loadingState ? 
                 <div className={loadingContainer}>
                   <LoadingProgress/>
                 </div>
                : <ContentLayout>
                   Hello World
                </ContentLayout>
              }
            </div>
          </Box>
        </Fade>
      </Modal>
    )
}