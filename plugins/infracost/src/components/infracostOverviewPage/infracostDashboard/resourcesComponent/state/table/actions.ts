import { ResourcesTableProps } from "../../types";

export const addRow = (row: ResourcesTableProps) => ({
    type: 'ADD_ROW',
    payload: row
} as const);

export const removeRow = (id:string)=>({
    type: 'REMOVE_ROW',
    payload: id
} as const);

export const updateRow = (row: ResourcesTableProps)=>({
    type: 'UPDATE_ROW',
    payload: row
} as const);


export type ResourcesTableActionType = ReturnType<typeof addRow | typeof removeRow | typeof updateRow>;