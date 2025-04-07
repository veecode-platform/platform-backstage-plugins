
import React from "react";
import { Meta } from "@storybook/react";
import { ContentLayout, ContentLayoutProps } from "./ContentLayout";
import { VeeLogo } from "../../icons/VeeLogo";
import { Content } from "@backstage/core-components";

export default {
  title: 'Layout/ContentLayout',
  component: ContentLayout.Root,
  args: {
    icon: VeeLogo,
    title: 'Title example',
    subtitle: 'Subtitle example',
    label: 'Label Example',
    children: 'Content here...',
  },
  argsTypes: {
    icon: { control: {} },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    label: { control: 'text' },
    children: { control: {} },
  },
  decorators: [
    Story => {
      return <Content>{Story()}</Content>;
    },
  ],
} as Meta<ContentLayoutProps>;

export const Default = ({
  icon,
  title,
  label,
  subtitle,
  children,
}: ContentLayoutProps) => (
  <ContentLayout.Root>
    <ContentLayout.Header icon={icon}>
      <ContentLayout.Label label={label!} />
      <ContentLayout.Title title={title!} />
      <ContentLayout.Subtitle subtitle={subtitle!} />
    </ContentLayout.Header>
    <ContentLayout.Body>{children}</ContentLayout.Body>
  </ContentLayout.Root>
);

export const TitleAndSubtitle = ({
    icon,
    title,
    subtitle,
    children,
  }: ContentLayoutProps) => (
    <ContentLayout.Root>
      <ContentLayout.Header icon={icon}>
        <ContentLayout.Title title={title!} />
        <ContentLayout.Subtitle subtitle={subtitle!} />
      </ContentLayout.Header>
      <ContentLayout.Body>{children}</ContentLayout.Body>
    </ContentLayout.Root>
  );

  export const TitleAndLabel = ({
    icon,
    title,
    label,
    children,
  }: ContentLayoutProps) => (
    <ContentLayout.Root>
      <ContentLayout.Header icon={icon}>
        <ContentLayout.Label label={label!} />
        <ContentLayout.Title title={title!} />
      </ContentLayout.Header>
      <ContentLayout.Body>{children}</ContentLayout.Body>
    </ContentLayout.Root>
  );
