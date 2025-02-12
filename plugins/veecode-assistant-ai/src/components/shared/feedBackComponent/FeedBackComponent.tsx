import { Box, Typography } from '@material-ui/core'
import React from 'react'
import Lottie from 'react-lottie';
import successAnimationData from "../../../assets/lotties/success.json";
import errorAnimationData from "../../../assets/lotties/error.json";
import { FeedbackComponentProps } from './types';
import { useFeedbackComponentStyles } from './styles';

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
        height={150}
        width={150}
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
        height={80}
        width={90}
      />
  );
}

export const FeedbackComponent : React.FC<FeedbackComponentProps>= (props) => {

  const { variant, message, actions } = props;
  const { blur, root, content, animation, btnGroup } = useFeedbackComponentStyles();

  return (
   <div className={blur}>
    <Box
      className={root}
     > 
      <div className={content}>
         <div className={animation}>
           {variant === "success" ? <SuccessAnimation/> : <ErrorAnimation/>}
          </div>
          <Typography variant="h6" style={{marginLeft: '2rem'}}>{message}</Typography>
      </div>
      {!!actions && (
         <div className={btnGroup}>
         {actions}
         </div>
      )}
    </Box>
    </div>
  )
}
