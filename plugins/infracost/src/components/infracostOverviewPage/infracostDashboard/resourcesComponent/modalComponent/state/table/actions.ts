import { ResourceDetailsTableProps } from "../../types";

export const addRow = (row: ResourceDetailsTableProps) => ({
    type: 'ADD_ROW',
    payload: row
} as const);

export const removeRow = (id:string)=>({
    type: 'REMOVE_ROW',
    payload: id
} as const);

export const updateRow = (row: ResourceDetailsTableProps)=>({
    type: 'UPDATE_ROW',
    payload: row
} as const);


export type ResourceDetailsTableActionType = ReturnType<typeof addRow | typeof removeRow | typeof updateRow>;