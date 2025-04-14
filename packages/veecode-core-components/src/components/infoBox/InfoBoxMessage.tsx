import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import React from "react"
import { themeVariables } from "../../utils/constants/themeVariables";
import { InfoAnimation } from "../../animations";

export interface InfoBoxMessageProps {
    message: string
}

const useInfoBoxMessageStyles = makeStyles({
    messageContent: {
        width: "100%",
        color: themeVariables.colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: '.5rem',
        position: 'relative'
    },
    alertAnimation:{
        width: '60px',
        position: 'absolute',
        left: '0',
        top: '50%'
      },
      messageBox: {
        marginLeft: '3.5rem'
      }
})

export const InfoBoxMessage :React.FC<InfoBoxMessageProps> = ({message}) => {
    const { messageContent,alertAnimation,messageBox } = useInfoBoxMessageStyles()
    return (
        <Box className={messageContent}>
          <Box className={alertAnimation}><InfoAnimation width={35} height={35}/></Box>
           <Box className={messageBox}>
             <Typography>{message}</Typography>
           </Box>
        </Box>
    )
}