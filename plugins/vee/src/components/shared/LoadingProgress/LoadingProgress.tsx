import React from 'react'
import { useLoadingProgressStyles } from './styles'
import Lottie from 'react-lottie';
import StarsAnimationData from '../../../assets/stars.json';


export const LoadingProgress = () => {

  const {loadingContent} = useLoadingProgressStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: StarsAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  return (
    <div className={loadingContent}>
        <Lottie 
          options={defaultOptions}
          height={200}
          width={200}
        />
    </div>
  )
}
