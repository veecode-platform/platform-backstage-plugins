import React from 'react';
import  Backdrop  from '@mui/material/Backdrop';
import StarsAnimationData from '../../../assets/stars.json';
import  Grid2  from '@mui/material/Grid2';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Lottie from 'react-lottie';
import { FeedbackComponentProps, FeedbackWrapperProps } from './types';
import { useFeedbackStyles } from './styles';
import SuccessAnimationData from '../../../assets/success.json';
import ErrorAnimationData from '../../../assets/error.json';

const lootieStyle = { 
    position: 'absolute', 
    top: '50%', 
    left: '50%',
    transform: 'translate(-50%,-50%)'
   } as React.CSSProperties

const SuccessAnimation = () => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: SuccessAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Lottie
      options={defaultOptions}
      height={150}
      width={150}
      style={lootieStyle}
    />
  );
}

const ErrorAnimation = () => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: ErrorAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Lottie
      options={defaultOptions}
      height={80}
      width={90}
      style={lootieStyle}
    />
  );
}

const LoadingAnimation = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: StarsAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Lottie
      options={defaultOptions}
      height={120}
      width={120}
      style={lootieStyle}
    />
  );
}


export const FeedbackWrapper : React.FC<FeedbackWrapperProps>= (props) => {

  const { open, onClose, message, actions, children } = props;
  const {  root, content, animation, textContent , btnGroup } = useFeedbackStyles();

  return (
    <Backdrop
      className={root}
      open={open}
      onClick={onClose}
    >
      <Grid2 container className={content}>
         <Grid2 size={4} className={animation}>
           {children}
          </Grid2>
          <Grid2 size={8}>
              <Typography variant="h5" component="div" className={textContent}>
                {message}
              </Typography>
           </Grid2>
      </Grid2>
      {!!actions && (
         <Box className={btnGroup}>
         {actions}
         </Box>
      )}
    </Backdrop>
  )
}


export const FeedbackComponent : React.FC<FeedbackComponentProps>= (props) => {

  const { variant, ...rest } = props;

  if(variant === "success") return (
     <FeedbackWrapper
      {...rest}
      >
       <SuccessAnimation/>
     </FeedbackWrapper>
  )

  if(variant === "error") return (
    <FeedbackWrapper
     {...rest}
     >
      <ErrorAnimation/>
    </FeedbackWrapper>
  )

  return (
    <FeedbackWrapper
    {...rest}
    >
     <LoadingAnimation/>
   </FeedbackWrapper>
  )
}
