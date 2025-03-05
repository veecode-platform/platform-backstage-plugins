import { IFixedOptions, IPlugin, IStack } from "@veecode-platform/backstage-plugin-vee-common";

export interface VeeStore {
    listFixedOptions(): Promise<IFixedOptions[]>;
    getFixedOptionsById(fixedOptionsId: string): Promise<IFixedOptions | null>;
    createFixedOptions(fixedOptions: IFixedOptions): Promise<IFixedOptions | null>;
    updateFixedOption({fixedOptionsId, fixedOptions} : UpdateFixedOptionsParams): Promise<IFixedOptions | null>;
    deleteFixedOption(fixedOptionsId: string): Promise<boolean>;
    listStacks(): Promise<IStack[]>;
    getStackById(stackId: string): Promise<IStack | null>;
    createStack(stack: IStack): Promise<IStack|null>;
    updateStack({stackId, stack}: UpdateStackParams): Promise<IStack | null>;
    deleteStack(stackId: string): Promise<boolean>
    listPlugins():Promise<IPlugin[]>,
    getPluginById(pluginId:string):Promise<IPlugin[]|null>,
    createPlugin(plugin:IPlugin):Promise<IPlugin|null>,
    updatePlugin({ pluginId, plugin}: UpdatePluginParams):Promise<IPlugin|null>,
    deletePlugin(pluginId: string):Promise<boolean>
}

export type UpdateFixedOptionsParams = {
    fixedOptionsId: string,
    fixedOptions: Partial <IFixedOptions>
}

export type UpdateStackParams = {
    stackId: string,
    stack: Partial<IStack>
}

export type UpdatePluginParams = {
    pluginId: string,
    plugin: Partial<IPlugin>
}