import React from "react";
import type { Meta } from "@storybook/react";
import { Feedback, FeedbackProps } from "./Feedback";
import { Button } from "../button/Button";

export default {
    title: 'Feedback/Feedback',
    component: Feedback.Success,
    args: {
        open: true,
        onClose: ()=>{},
        message: 'Feedback message',
        actions: (<><Button.Contained>Dismiss</Button.Contained></>)
    },
    argTypes:{
        open: { control: 'boolean'},
        onClose : { action: 'clicked'  },
        message: { control: 'text' },
        actions: { control: 'object' }
    }
} as Meta<FeedbackProps>

export const Success = (args:FeedbackProps) => (
    <Feedback.Root open={args.open} onClose={args.onClose}>
        <Feedback.Success message={args.message}/>
        <Feedback.Actions>{args.actions}</Feedback.Actions>
    </Feedback.Root>
)

export const Error = (args:FeedbackProps) => (
    <Feedback.Root open={args.open} onClose={args.onClose}>
        <Feedback.Error message={args.message}/>
        <Feedback.Actions>{args.actions}</Feedback.Actions>
    </Feedback.Root>
)

export const AILoading = (args:FeedbackProps) => (
    <Feedback.Root open={args.open} onClose={args.onClose}>
        <Feedback.AILoading message={args.message}/>
        <Feedback.Actions>{args.actions}</Feedback.Actions>
    </Feedback.Root>
)