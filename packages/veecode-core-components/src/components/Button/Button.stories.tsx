import React from "react";
import type { Meta } from "@storybook/react";
import { Button,ButtonProps } from "./Button";
import { MdErrorOutline } from "react-icons/md";


export default {
    title: 'Components/Button',
    component: Button.Primary,
    args:{
        label: 'Button Label'
    },
    argTypes: {
        label: { control: 'text' }
    }
} as Meta<ButtonProps>;

export const Primary = ({label, ...rest}:ButtonProps) => (
    <Button.Primary label={label} {...rest}/>
)

export const Secondary = ({label, ...rest}:ButtonProps) => (
    <Button.Secondary label={label} {...rest} />
)

export const Contained = ({label, ...rest}:ButtonProps) => (
    <Button.Contained label={label} {...rest}/>
)

export const Danger = ({label, ...rest}:ButtonProps) => (
 <Button.Danger label={label} icon={MdErrorOutline} {...rest} />
)