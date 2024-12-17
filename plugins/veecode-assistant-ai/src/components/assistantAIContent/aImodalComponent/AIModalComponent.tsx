import React from "react";
import { useAIModalComponentStyles } from "./styles";
import { AIModalComponentProps } from "./types";
import { Box, Fade, Modal, Tooltip } from '@material-ui/core';
import { MdClose } from "react-icons/md";
import { AIContent } from "./aIContent/AIContent";
import { useEntity } from "@backstage/plugin-catalog-react";
import { useEntityAnnotation } from "../../../hooks/useEntityAnnotation";

export const AIModalComponent : React.FC<AIModalComponentProps> = (props) => {
    
    const { show, toggleDialog } = props;
    const { modalOnBlur,modalContent,modalHeader,closeModal,modalBody } = useAIModalComponentStyles();
    const { entity } = useEntity();
    const { location, projectName, engine } = useEntityAnnotation(entity);

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
              <AIContent 
                engine={engine!}
                location={location!}
                projectName={projectName!}
                toggleDialog={toggleDialog}
                />
            </div>
          </Box>
        </Fade>
      </Modal>
    )
}