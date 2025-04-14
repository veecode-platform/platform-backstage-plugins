import React from "react";
import StarsAnimationData from "./stars.json"
import Lottie from "react-lottie";
import { lootieStyle } from "../../styles";
import { AnimationProps } from "../../types";


export const AILoadingAnimation : React.FC<AnimationProps> = ({width,height}) => {

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
        width={width}
        height={height}
        style={lootieStyle}
      />
    );
  }