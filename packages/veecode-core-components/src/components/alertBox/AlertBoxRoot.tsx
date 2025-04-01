import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";

export interface AlertBoxRootProps {
    icon: React.ElementType,
    styles: string,
    children: React.ReactNode
}

const useAlertBoxStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: '40vw',
    maxWidth: '45vw',
    padding: '1.2rem 2rem',
    borderRadius: '0 10px 10px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '2rem',
    color: themeVariables.colors.white,
    '& span': {
      marginRight: '1rem',
    }
  },
  alertAnimation:{
    width: '60px',
    position: 'absolute',
    left: '0',
    top: '50%'
  },
  messageBox: {
    marginLeft: '2rem'
  }
});

export const AlertBoxRoot : React.FC<AlertBoxRootProps> = ({icon : Icon, styles, children}) => {
    const { root, alertAnimation, messageBox } = useAlertBoxStyles();
    return (
        <Box className={`${root} ${styles}`}>
          <Box className={alertAnimation}><Icon width={40} height={40}/></Box>
          <Box className={messageBox}>{children}</Box>
        </Box>
    )
}