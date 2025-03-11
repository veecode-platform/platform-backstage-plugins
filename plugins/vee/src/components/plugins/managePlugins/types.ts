import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";

export type ManagePluginsRow = Omit<IPlugin,"annotations"> & {annotations: string[]}