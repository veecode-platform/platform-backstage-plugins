import React from "react";
import type { Meta } from "@storybook/react";
import { EmptyStateComponent, EmptyStateComponentProps } from "./EmptyStateComponent";
import { Content } from "@backstage/core-components";

export default {
    title: 'Feedback/EmptyState',
    component: EmptyStateComponent.Root,
    args: {
        title: 'EmptyState title example',
        message: 'EmptyState message example',
        url: '#'
    },
    argsType: {
        title: { control: 'text'},
        message: { control: 'text'}
    },
    decorators: [
      (Story) => {
        return (
            <Content>
                {Story()}
            </Content>
        )
      }
    ]
} as Meta<EmptyStateComponentProps>;

export const Default = ({title, message,url}:EmptyStateComponentProps) => (
    <EmptyStateComponent.Root>
        <EmptyStateComponent.Title>{title}</EmptyStateComponent.Title>
        <EmptyStateComponent.Message>{message}</EmptyStateComponent.Message>
        <EmptyStateComponent.Docs url={url!} />
    </EmptyStateComponent.Root>
)