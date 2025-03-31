import React from "react";
import ErrorAnimationData from "./error.json"
import Lottie from "react-lottie";
import { lootieStyle } from "../styles";
import { AnimationProps } from "../types";

export const ErrorAnimation :React.FC<AnimationProps> = ({width,height}) => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: ErrorAnimationData,
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