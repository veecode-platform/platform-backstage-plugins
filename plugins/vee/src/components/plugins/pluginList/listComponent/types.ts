export interface ListComponentProps {
    data: PluginListProps[]
}

export interface PluginListProps {
    id: string,
    icon: string | React.JSX.Element | null,
    name: string
}