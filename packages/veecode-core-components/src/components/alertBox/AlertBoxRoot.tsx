import { Backdrop, Box, SvgIcon } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import { Close } from "@mui/icons-material"

export interface AlertBoxRootProps {
    open: boolean,
    variant: "persistent" | "transient",
    icon: React.ElementType,
    styles: string,
    children: React.ReactNode
}

const useAlertBoxStyles = makeStyles({
  backdrop:{
    zIndex: 9999,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '1rem'
    },
  root: {
    width: '100%',
    minWidth: '40vw',
    maxWidth: '45vw',
    padding: '1.2rem 2rem',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  closeIcon: {
    cursor: 'pointer'
  }}
);

export const AlertBoxRoot : React.FC<AlertBoxRootProps> = ({open, variant,icon : Icon, styles, children}) => {
    const [ show, setShow ] = React.useState<boolean>(false);
    const { backdrop,root, alertAnimation, messageBox,closeIcon } = useAlertBoxStyles();

    const handleClose = () => setShow(false);    React.useEffect(()=>{
      if(open){
        setShow(true);
        if (variant === "transient"){
          setTimeout(()=>{
            setShow(false);
            handleClose();
          },3000)
        }
      }

      return () => {
        setShow(false);}
    },[open]);

    return (
      <Backdrop className={backdrop} open={show} onClick={handleClose}>
        <Box className={`${root} ${styles}`}>
          <Box className={alertAnimation}>
            <Icon width={40} height={40} />
          </Box>
          <Box className={messageBox}>{children}</Box>
          <Box className={closeIcon} onClick={handleClose}>
            <SvgIcon component={Close} inheritViewBox />
          </Box>
        </Box>
      </Backdrop>
    );
}