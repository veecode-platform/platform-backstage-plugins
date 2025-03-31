import React from "react";
import type { Meta } from "@storybook/react";
import { Button } from "./Button";
import { ButtonRootProps } from "./ButtonRoot";
import { ButtonDangerProps } from "./ButtonDanger";
import { ButtonContainedProps } from "./ButtonContained";
import { ButtonSecondaryProps } from "./ButtonSecondary";
import { ButtonPrimaryProps } from "./ButtonPrimary";
import { MdErrorOutline } from "react-icons/md";


export default {
    title: 'Components/Button',
    component: Button.Primary,
    args:{
        label: 'Button Label'
    },
    argTypes: {
        label: { control: 'text' },
        icon: { control: 'Element Type'},
        styles: { control: 'text'}
    }
} as Meta<ButtonRootProps>;

export const Primary = (args:ButtonPrimaryProps) => (
    <Button.Primary {...args} label="Button Primary"/>
)

export const Secondary = (args:ButtonSecondaryProps) => (
    <Button.Secondary {...args} label="Button Secondary"/>
)

export const Contained = (args:ButtonContainedProps) => (
    <Button.Contained {...args} label="Button Contained"/>
)

export const Danger = (args:ButtonDangerProps) => (
 <Button.Danger {...args} label="Button Danger" icon={MdErrorOutline} />
)