import React from "react";
import type { Meta } from "@storybook/react";
import { Box } from "@mui/material";
import { OptionCard, OptionCardProps } from "./OptionCard";
import { StackIcon } from "../../icons/stack-icon";

export default {
    title: 'Components/OptionCard',
    component: OptionCard.Root,
    args: {
      icon: StackIcon,
      title: "Title",
      subtitle: "Subtitle example",
      description: "Description example",
      tags: ["Item 1", "Item 2", "Item 3"]
    },
    argTypes:{
        icon: { control: {}},
        title: { control: 'text'},
        subtitle: { control: 'text'},
        description: { control: 'text'}
    },
    decorators: [
            (Story) => {
                return (<Box sx={{maxWidth: '80vw'}}>
                    {Story()}
                </Box>)
            }
        ]
} as Meta<OptionCardProps>

export const Default = ({icon, title, subtitle, description, tags}:OptionCardProps) => (
    <OptionCard.Root>
        <OptionCard.Icon icon={icon} />
        <OptionCard.Content>
            <OptionCard.title title={title} />
            <OptionCard.subtitle subtitle={subtitle!} />
            <OptionCard.description description={description!} />
        </OptionCard.Content>
        <OptionCard.tags tags={tags!} />
    </OptionCard.Root>
)