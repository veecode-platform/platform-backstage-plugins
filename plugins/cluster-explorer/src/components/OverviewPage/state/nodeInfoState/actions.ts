import { ClusterNodes } from "../../../../utils/types";

export const addNodeInfo = (nodeInfo: Partial<ClusterNodes>) => ({
    type: 'ADD_NODE_INFO',
    payload: nodeInfo
}as const);

export const removeNodeInfo = () => ({
    type: 'ADD_NODE_INFO',
    payload: {}
}as const);

export type NodeInfoActionType = ReturnType<typeof addNodeInfo | typeof removeNodeInfo>