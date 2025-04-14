import React from "react";
import LoadingAnimationData from "./loading.json"
import Lottie from "react-lottie";
import { lootieStyle } from "../../styles";
import { AnimationProps } from "../../types";


export const LoadingAnimation : React.FC<AnimationProps> = ({width,height}) => {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: LoadingAnimationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
    return (
      <Lottie
        options={defaultOptions}
        width={width}
        height={height}
        style={lootieStyle}
      />
    );
  }