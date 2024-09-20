import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { FeedbackComponentProps } from './types';
import { useFeedbackComponentStyles } from './styles';
import Lottie from 'react-lottie';
import successAnimationData from "./assets/success.json";
import errorAnimationData from "./assets/error.json";

const SuccessAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
      <Lottie 
	      options={defaultOptions}
        height={180}
        width={180}
      />
  );
}

const ErrorAnimation = () => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: errorAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
      <Lottie 
	      options={defaultOptions}
        height={90}
        width={90}
      />
  );
}

export const FeedbackComponent : React.FC<FeedbackComponentProps>= (props) => {

  const { variant, message } = props;
  const { root, content, animation } = useFeedbackComponentStyles();

  return (
    <Box
      className={root}
     > 
      <div className={content}>
         <div className={animation}>
           {variant === "success" ? <SuccessAnimation/> : <ErrorAnimation/>}
          </div>
          <Typography variant="h6">{message}</Typography>
      </div>
    </Box>
  )
}
