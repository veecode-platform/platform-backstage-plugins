import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import React from "react"
import { FcInfo } from "react-icons/fc";
import { themeVariables } from "../../utils/constants/themeVariables";

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
        gap: '.5rem'
    }
})

export const InfoBoxMessage :React.FC<InfoBoxMessageProps> = ({message}) => {
    const { messageContent } = useInfoBoxMessageStyles()
    return (
        <Box className={messageContent}>
            <FcInfo size={20}/>
           <Typography>{message}</Typography>
        </Box>
    )
}