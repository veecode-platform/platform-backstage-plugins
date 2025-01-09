import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { PullRequestResponseActionType } from "./actions";

export const initialPullRequestResponseState : PullRequestResponse | null = null;

export const PullRequestResponseReducer = (state: PullRequestResponse | null, action: PullRequestResponseActionType):PullRequestResponse | null => {
    switch (action.type) {
        case 'ADD_PULL_REQUEST_RESPONSE':
            return action.payload;
        case 'REMOVE_PULL_REQUEST_RESPONSE':
            return null;
        default:
            return state;
    }
}