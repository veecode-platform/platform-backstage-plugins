import React from "react";
import type { Meta } from "@storybook/react";
import { InfoBox, InfoBoxTypes } from "./InfoBox";
import { Box } from "@mui/material";

export default {
    title: 'FeedBack/InfoBox',
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
} as Meta<InfoBoxTypes>

export const Default = (args:InfoBoxTypes) => (
    <InfoBox.Root>
        <InfoBox.Message message={args.message} />
        <InfoBox.Docs url={args.url!}/>
    </InfoBox.Root>
)