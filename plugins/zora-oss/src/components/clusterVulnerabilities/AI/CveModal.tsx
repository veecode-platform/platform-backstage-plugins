import React from 'react'
import { useModalComponentStyles } from './styles';
import { Box, Fade, Modal, Tooltip } from '@material-ui/core';
import { MdClose } from "react-icons/md";
import { ResponseErrorPanel } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import OpenAI from 'openai';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { SpinnerRoundFilled } from 'spinners-react';


type ModalProps = {
    show: boolean,
    handleCloseModal: () => void,

    imageName: string,
    distro: string,
    cve: string,
    packageName: string,

    //handleLoadingAi: (arg: boolean) => void,

}


export const CveModalComponent: React.FC<ModalProps> = (props) => {

    const { show, handleCloseModal, imageName, distro, cve, packageName/*, handleLoadingAi*/ } = props;
    const { modalOnBlur, modalContent, modalHeader, closeModal, modalBody, } = useModalComponentStyles();
    const config = useApi(configApiRef);

    const { value, loading,  error } = useAsync(async (): Promise<any> => {

        const OpenAiclient = new OpenAI({
            apiKey: config.getConfig("zoraOss").getString("openAiApiKey"),
            dangerouslyAllowBrowser: true,
        });


        const message = `im using this image: ${imageName} from ${distro}. what can you give me an explanation about ${cve} found in package ${packageName} and what can i do to fix it?`;
        const chatCompletion = await OpenAiclient.chat.completions.create({
            messages: [{
                role: 'user',
                content: message,
            }],
            model: config.getConfig("zoraOss").getString("openAiModel")
            
        });

        return chatCompletion.choices[0].message.content

    }, [cve]);

    if(loading){
        return  <Modal
        open={loading}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-job-details"
        aria-describedby="modal-modal-jobs-details-and-steps"
        className={modalOnBlur}
        closeAfterTransition
    >
        <Fade in={loading}>
            <Box className={modalContent}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                <SpinnerRoundFilled/>
                </div>
            </Box>
        </Fade>
    </Modal>
    }


    if (error) {
        return <ResponseErrorPanel error={error} />;
    }

    return (
        <>
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

                            <SyntaxHighlighter customStyle={{ width: "90%", overflow: "auto", maxHeight: "80vh" }} language="bash" style={atomOneDark}>
                                {value}
                            </SyntaxHighlighter>

                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    )

}
