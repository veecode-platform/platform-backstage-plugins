import { Resource } from "@veecode-platform/backstage-plugin-infracost-common"

export type ModalComponentProps = {
    show: boolean,
    handleCloseModal: () => void,
    onSave?: () => void;
}

export type ResourceDetailsComponentProps = {
    resourceName: string,
    labelProps: string[],
    resource: Resource
    // tableDataProps: any[]
}

export type ResourceDetails = {
    resourceName: string,
    costComponents: CostComponentDetails[]
 }
 
export type CostComponentDetails = {
     name: string,
     monthlyQty: string, // monthlyQty+unit
     monthlyCost: string // $ 20,00
 }

export type ResourceDetailsTableProps = {
    id: string,
    monthly_cost: string,
    monthly_qty: string,
}