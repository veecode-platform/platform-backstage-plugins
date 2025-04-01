import React from "react";
import type { Meta } from "@storybook/react";
import { AlertBox, AlertBoxProps } from "./AltertBox";
import { AlertBoxInfoProps } from "./AlertBoxInfo";

export default {
    title: 'Feedback/AlertBox',
    component: AlertBox.Info,
    args: {
        children: 'Message content'
    },
    argTypes:{
        children: { control: 'text'}
    }
} as Meta<AlertBoxInfoProps>;

export const Info = (args:AlertBoxProps) => (
    <AlertBox.Info>{args.children}</AlertBox.Info>
)

export const Success = (args:AlertBoxProps) => (
    <AlertBox.Success>{args.children}</AlertBox.Success>
)

export const Error = (args:AlertBoxProps) => (
    <AlertBox.Error>{args.children}</AlertBox.Error>
)

export const Warning = (args:AlertBoxProps) => (
    <AlertBox.Warning>{args.children}</AlertBox.Warning>
)