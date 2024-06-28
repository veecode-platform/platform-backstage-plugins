import { Resource } from "@veecode-platform/backstage-plugin-infracost-common";

export type ResourcesComponentProps = {
    timeGenerated: Date,
    resources: Resource[],
}

export type ResourcesTableProps = {
    id: string,
    monthly_cost: string 
}