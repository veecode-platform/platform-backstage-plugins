import { PullRequestType } from "../../../utils/types";
import { PullRequestActionType } from "./actions";

export const initialPullRequestState : PullRequestType | null = null;

export const PullRequestInfoReducer = (state: PullRequestType | null, action: PullRequestActionType ) : PullRequestType | null => {
    switch(action.type){
        case 'SAVE_PULL_REQUEST_INFO':
            return action.payload;
        case 'CLEAR_PULL_REQUEST_INFO':
            return null;
        default:
            return state;
    }
}       