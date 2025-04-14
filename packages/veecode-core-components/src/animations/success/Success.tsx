import React from "react";
import SuccessAnimationData from "./success.json"
import Lottie from "react-lottie";
import { lootieStyle } from "../styles";
import { AnimationProps } from "../types";

export const SuccessAnimation : React.FC<AnimationProps> = ({width, height}) => {

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
      width={width}
      height={height}
      style={lootieStyle}
    />
  );
}