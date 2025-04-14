import React from "react";
import type { Meta } from "@storybook/react";
import { Button,ButtonProps } from "./Button";

export default {
    title: 'Components/Button',
    component: Button.Primary,
    args:{
        children: 'Button Label'
    },
    argTypes: {
        children: { control: 'object' }
    }
} as Meta<ButtonProps>;

export const Primary = ({children, ...rest}:ButtonProps) => (
    <Button.Primary {...rest}>{children}</Button.Primary>
)

export const Secondary = ({children, ...rest}:ButtonProps) => (
    <Button.Secondary {...rest}>{children}</Button.Secondary>
)

export const Contained = ({children, ...rest}:ButtonProps) => (
    <Button.Contained {...rest}>{children}</Button.Contained>
)

export const Danger = ({children, ...rest}:ButtonProps) => (
 <Button.Danger {...rest}>{children}</Button.Danger>
)