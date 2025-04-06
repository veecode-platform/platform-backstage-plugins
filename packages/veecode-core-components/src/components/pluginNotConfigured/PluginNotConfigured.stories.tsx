import React from "react";
import type { Meta } from "@storybook/react";
import { PluginNotConfigured, PluginNotConfiguredProps } from "./PluginNotConfigured";

export default {
    title: 'Feedback/PluginNotConfigured',
    component: PluginNotConfigured,
    args: {
        pluginName: 'Plugin Name',
        message: 'The Plugin is not configured, please take a look at our documentation to configure it correctly.',
        url: '#'
    },
    argsType: {
        pluginName: { control: 'text' },
        message: {control: 'text'},
        url: {control: 'text'}
    }
} as Meta<PluginNotConfiguredProps>;

export const Default = ({pluginName,message,url}:PluginNotConfiguredProps) => (
    <PluginNotConfigured 
      pluginName={pluginName}
      message={message}
      url={url}
    />
)