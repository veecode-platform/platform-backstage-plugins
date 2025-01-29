import { PluginPerCategory } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface PluginsCardsWrapperProps {
  children: React.ReactNode
}

export interface PluginsCardsProps {
    filterByAssociated?: boolean,
    listAllPlugins: () => Promise<PluginPerCategory[] | null>;
    associatedPluginsName: string[]|[];
  }