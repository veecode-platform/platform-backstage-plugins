export interface UpdatePluginProps {
    onCloseModal: () => void;
}

export type PluginStateType = {
    pluginId:string, 
    name:string, 
    docs: string,
    annotations: string[]
}