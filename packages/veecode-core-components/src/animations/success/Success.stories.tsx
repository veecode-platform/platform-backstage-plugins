
import React from "react";
import type { Meta } from "@storybook/react"
import { Box } from "@mui/material";
import { animationStyle } from "../styles";
import { SuccessAnimation } from "./Success";
import { AnimationProps } from "../types";

export default {
    title: 'Animations/Success',
    component: SuccessAnimation,
    args: {
        width: 150,
        height: 150
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

export const Default = ({width, height}:AnimationProps) => {
    /**
     * @public
     * The parent component must have the relative position
     */
    return <SuccessAnimation width={width} height={height}/>
}