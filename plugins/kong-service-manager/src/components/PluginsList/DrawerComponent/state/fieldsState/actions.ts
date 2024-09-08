import { PluginFieldsResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const addFields = (fields:PluginFieldsResponse[])=>({
    type: 'ADD_FIELDS',
    payload: fields
} as const);

export const removeFields = (fieldName : string)=>({
    type: 'REMOVE_FIELD',
    payload: fieldName
}as const);

export const updateFields = (field: PluginFieldsResponse)=>({
    type: 'UPDATE_FIELD',
    payload: field
}as const);

export type FieldsActionType = ReturnType<typeof addFields | typeof removeFields | typeof updateFields>;