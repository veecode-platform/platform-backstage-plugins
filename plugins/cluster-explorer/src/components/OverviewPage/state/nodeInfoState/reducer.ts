import { ClusterNodes } from "../../../../utils/types";
import { NodeInfoActionType } from "./actions";

export const initialNodeInfoState : Partial<ClusterNodes> = {};

export const NodeInfoReducer = (state: Partial<ClusterNodes>, action: NodeInfoActionType) : Partial<ClusterNodes> => {
    switch (action.type){
        case 'ADD_NODE_INFO':
          return action.payload;
        case 'REMOVE_NODE_INFO':
          return {}
        default:
          return state
    }
}