import { StackIcon } from "../../assets/stack-icon";
import { PluginIcon } from "../../assets/plugin-icon";
// import { FixedOptionsIcon } from "../../assets/fixed-options-icon";

export const settingsOptions = [
    {
        id: 0,
        icon: StackIcon,
        title: 'Manage Stacks',
        tooltip: 'List, create, delete or edit a stack in this menu.',
        path: 'manage-stacks'  
    },
    {
        id: 1,
        icon: PluginIcon,
        title: 'Manage Plugins',
        tooltip: 'List, add, edit or remove the plugins that will be available for your templates',
        path: 'manage-plugins'  
    },
    // {
    //     id: 3,
    //     icon: FixedOptionsIcon,
    //     title: 'Manage Fixed Options',
    //     tooltip: 'List, create, delete or edit fixed options that will appear in your AI assistant according to your needs.',
    //     path: 'settings' 
    // }
]
