import React from "react";
import type { Meta } from "@storybook/react";
import { AlertBox, AlertBoxProps } from "./AltertBox";

export default {
    title: 'Feedback/AlertBox',
    component: AlertBox.Info,
    args: {
        open: true,
        variant: 'persistent',
        children: 'Message content'
    },
    argTypes:{
        open: { control: 'boolean' },
        variant: { control: 'select', options: ['persistent', 'transient'] },
        children: { control: 'text'}
    }
} as Meta<AlertBoxProps>;

export const Info = ({open,variant,children}:AlertBoxProps) => (
    <AlertBox.Info open={open} variant={variant}>{children}</AlertBox.Info>
)

export const Success = ({open,variant,children}:AlertBoxProps) => (
    <AlertBox.Success open={open} variant={variant}>{children}</AlertBox.Success>
)

export const Error = ({open,variant,children}:AlertBoxProps) => (
    <AlertBox.Error open={open} variant={variant}>{children}</AlertBox.Error>
)

export const Warning = ({open,variant,children}:AlertBoxProps) => (
    <AlertBox.Warning open={open} variant={variant}>{children}</AlertBox.Warning>
)