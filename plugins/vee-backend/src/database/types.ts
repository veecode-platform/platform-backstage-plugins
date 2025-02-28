import { IFixedOption, IPlugin, IStack } from "@veecode-platform/backstage-plugin-vee-common";

export interface IFixedOptionsStore {
    listFixedOptions(): Promise<IFixedOption[] | null>;
    getFixedOptionById(fixedOptionId: string): Promise<IFixedOption | null>;
    createFixedOption(fixedOption: IFixedOption): Promise<IFixedOption|null>;
    updateFixedOption(fixedOption: IFixedOption): Promise<IFixedOption | null>;
    deleteFixedOption(fixedOptionId: string): Promise<boolean>
}

export interface IStackStore {
    listStacks(): Promise<IStack[] | null>;
    getStackById(stackId: string): Promise<IStack | null>;
    createStack(stack: IStack): Promise<IStack|null>;
    updateStack(stack: IStack): Promise<IStack | null>;
    deleteStack(stackId: string): Promise<boolean>
}

export interface IPluginStore {
    listPlugins():Promise<IPlugin[]|null>,
    getPluginById(pluginId:string):Promise<IPlugin[]|null>,
    createPlugin(plugin:IPlugin):Promise<IPlugin|null>,
    updatePlugin(plugin:IPlugin):Promise<IPlugin|null>,
    deletePlugin(pluginId: string):Promise<boolean>
}