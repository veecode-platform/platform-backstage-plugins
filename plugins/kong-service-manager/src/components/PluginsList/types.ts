import { AssociatedPluginsResponse, PluginPerCategory } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface PluginsListProps {
    listAllEnabledPlugins : () => Promise<PluginPerCategory[] | null>,
    listAssociatedPlugins: () => Promise<AssociatedPluginsResponse[]>,
    allAssociatedPluginsState: AssociatedPluginsResponse[] | null,
    pluginsPerCategoryState:  PluginPerCategory[] | []
}