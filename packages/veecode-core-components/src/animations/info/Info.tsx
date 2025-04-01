import React from "react";
import InfoAnimationData from "./info.json"
import Lottie from "react-lottie";
import { lootieStyle } from "../styles";
import { AnimationProps } from "../types";

export const InfoAnimation :React.FC<AnimationProps> = ({width,height}) => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: InfoAnimationData,
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