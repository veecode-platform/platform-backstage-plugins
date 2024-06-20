import React from 'react'
import { useSuccessfulAnalysisStyles } from './styles'
import { Box, Typography } from '@material-ui/core';
import ClusterImg from '../../../assets/server.svg';
import animationHands from '../../../assets/lotties/hello.json'
import animationSuccess from '../../../assets/lotties/success.json'
import Lottie from 'react-lottie';


const AnimationHands = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationHands,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Lottie
      options={defaultOptions}
      height={45}
      width={45}
      style={{ position: 'absolute' }}
    />
  );
};

const AnimationSuccess = () => {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationSuccess,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    return (
      <Lottie
        options={defaultOptions}
        height={180}
        width={180}
        style={{ position: 'absolute', right:'30%', bottom: '5%' }}
      />
    );
  };


export const SuccessfulAnalysis = () => {

  const {container, content, header, subtitle, feedbackBody} = useSuccessfulAnalysisStyles();

  return (
    <div className={container}>
        <Box className={content}>
           <div className={header}>
             <AnimationHands/>
             <Typography variant="h5" className={subtitle}> 
                Good news, your application is ok!
             </Typography>
           </div>
            <div className={feedbackBody}>
              <img src={ClusterImg} alt=""/>
              <AnimationSuccess/>
            </div>
        </Box>
    </div>
  )
}
