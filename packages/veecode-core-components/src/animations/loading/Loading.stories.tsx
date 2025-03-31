
import React from "react";
import type { Meta } from "@storybook/react"
import { Box } from "@mui/material";
import { animationStyle } from "../styles";
import { AILoadingAnimation } from "./AILoading";
import { AnimationProps } from "../types";

export default {
    title: 'Animations/Loading',
    component: AILoadingAnimation,
    args: {
        width: 120,
        height: 120
    },
    argTypes:{
      width: { control: 'number'},
      height: { control: 'number'}
    },
    decorators: [
        (Story) => {
            return (<Box sx={animationStyle}>{Story()}</Box>)
        }
    ]
} as Meta<AnimationProps>;

export const AILoading = ({width, height}:AnimationProps) => {
    /**
     * @public
     * The parent component must have the relative position
     */
    return <AILoadingAnimation width={width} height={height}/>
}