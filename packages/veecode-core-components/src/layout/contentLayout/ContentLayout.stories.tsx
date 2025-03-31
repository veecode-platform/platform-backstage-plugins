
import React from "react";
import { Meta,StoryObj } from "@storybook/react";
import { ContentLayout, ContentLayoutProps } from ".";

export default {
    title: 'Examples/Layout/ContentLayout',
    component: ContentLayout.Root,
    decorators: [
        () => {
            return (
                 <ContentLayout.Root>
                    <ContentLayout.Header>
                        <ContentLayout.Label label="Label test"/>
                        <ContentLayout.Title title="Hello World"/>
                        <ContentLayout.Subtitle subtitle="subtitle test"/>
                    </ContentLayout.Header>
                    <ContentLayout.Body>
                        {/* TODO */}
                        <h1>Hello World</h1> 
                    </ContentLayout.Body>
               </ContentLayout.Root>
            )
        }
    ]
} as Meta<ContentLayoutProps>;

export const Default : StoryObj<ContentLayoutProps> = {}