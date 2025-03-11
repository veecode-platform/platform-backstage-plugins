import { IStack } from "@veecode-platform/backstage-plugin-vee-common";

export type ManageStacksRow = Omit<IStack,"plugins"> & {plugins: string[]}
