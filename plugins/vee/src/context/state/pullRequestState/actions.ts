import { PullRequestType } from "../../../utils/types";

export const savePullRequestInfo = (value:PullRequestType) => ({
    type: 'SAVE_PULL_REQUEST_INFO',
    payload: value
} as const);

export const clearPullRequestInfo = () => ({
    type: 'CLEAR_PULL_REQUEST_INFO',
    payload: null
 } as const);

 export type PullRequestActionType = ReturnType<typeof savePullRequestInfo | typeof clearPullRequestInfo >;