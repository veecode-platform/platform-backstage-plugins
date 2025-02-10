import { PluginCard } from "../../../../utils/types";

export interface PluginsCategoryProps {
    label: string,
    plugins: PluginCard[]|[],
    allowed: boolean
}
export interface CategoryComponentProps {
    label: string,
    plugins: PluginCard[]|[]
}