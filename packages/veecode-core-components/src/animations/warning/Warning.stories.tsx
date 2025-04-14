
import React from "react";
import type { Meta } from "@storybook/react"
import { WarningAnimation } from "./Warning";
import { Box } from "@mui/material";
import { animationStyle } from "../styles";
import { AnimationProps } from "../types";

export default {
    title: 'Animations/Warning',
    component: WarningAnimation,
    args: {
        width: 90,
        height: 90
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
    return <WarningAnimation width={width} height={height}/>
}