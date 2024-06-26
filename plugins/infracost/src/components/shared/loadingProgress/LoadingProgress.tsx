import React from 'react'
import { useLoadingProgressStyles } from './styles'
// import Lottie from 'react-lottie';
// import animationData from '../../../assets/lotties/stars.json'

export const LoadingProgress = () => {

  const {loadingContent} = useLoadingProgressStyles();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // };
  
  return (
    <div className={loadingContent}>
        {/* <Lottie 
          options={defaultOptions}
          height={200}
          width={200}
        /> */}
        Loading ...
    </div>
  )
}
