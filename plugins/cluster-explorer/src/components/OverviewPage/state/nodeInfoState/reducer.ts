import { ClusterNodes } from "../../../../utils/types";

type NodeInfoAction =
| {type: 'ADD_NODE_INFO', payload: Partial<ClusterNodes>}
| {type: 'REMOVE_NODE_INFO', payload: {}};

export const initialNodeInfoState : Partial<ClusterNodes> = {};

export const NodeInfoReducer = (state: Partial<ClusterNodes>, action: NodeInfoAction) : Partial<ClusterNodes> => {
    switch (action.type){
        case 'ADD_NODE_INFO':
          return action.payload;
        case 'REMOVE_NODE_INFO':
          return {}
        default:
          return state
    }
}