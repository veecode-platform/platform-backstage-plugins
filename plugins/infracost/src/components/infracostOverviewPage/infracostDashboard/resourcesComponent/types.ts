import { Resource } from "@veecode-platform/backstage-plugin-infracost-common";

export type ResourcesComponentProps = {
    projectName: string,
    resources: Resource[],
}

export type ResourcesTableProps = {
    id: string,
    monthly_cost: string 
}