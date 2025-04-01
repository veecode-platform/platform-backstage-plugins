import React from "react";
import WarningAnimationData from "./warning.json"
import Lottie from "react-lottie";
import { lootieStyle } from "../styles";
import { AnimationProps } from "../types";

export const WarningAnimation :React.FC<AnimationProps> = ({width,height}) => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: WarningAnimationData,
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