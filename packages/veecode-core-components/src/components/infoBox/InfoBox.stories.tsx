import React from "react";
import type { Meta } from "@storybook/react";
import { InfoBox, InfoBoxProps } from "./InfoBox";
import { Box } from "@mui/material";

export default {
    title: 'Feedback/InfoBox',
    component: InfoBox.Root,
    args: {
      message: 'No data to show, see how add content in docs',
      url: '#'
    },
    argTypes:{
        message: { control: 'text'}
    },
    decorators: [
        (Story) => {
            return (<Box sx={{maxWidth: '80vw'}}>
                {Story()}
            </Box>)
        }
    ]
} as Meta<InfoBoxProps>

export const Default = (args:InfoBoxProps) => (
    <InfoBox.Root>
        <InfoBox.Message message={args.message} />
        <InfoBox.Docs url={args.url!}/>
    </InfoBox.Root>
)