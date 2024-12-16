import React from "react";
import Lottie from "react-lottie";
import animationData from '../../../assets/lotties/typing-animation.json'
import { useLoadingAnswerStyles } from "./styles";

export const LoadingAnswer = () => {

    const {loadingContent} = useLoadingAnswerStyles();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
    <div className={loadingContent}>
      <Lottie 
        options={defaultOptions}
        height={120}
        width={120}
       />
    </div>
  )
}