import { AssociatedPluginsResponse, PluginPerCategory } from "@veecode-platform/backstage-plugin-kong-service-manager-common"

export interface PluginListProps {
  listAllPlugins: () => Promise<PluginPerCategory[] | null>;
  listAssociatedPlugins: () => Promise<AssociatedPluginsResponse[]>;
  associatedPluginsState: AssociatedPluginsResponse[] | null;
  associatedPluginsName: string[]|[];
  
}
