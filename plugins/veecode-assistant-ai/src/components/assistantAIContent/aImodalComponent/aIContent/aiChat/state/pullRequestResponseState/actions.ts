import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export const addPullRequestResponse = (response: PullRequestResponse) => ({
    type: 'ADD_PULL_REQUEST_RESPONSE',
    payload: response
}as const);

export const removePullRequestResponse = () => ({
    type: 'REMOVE_PULL_REQUEST_RESPONSE',
    payload: null
} as const);

export type PullRequestResponseActionType = ReturnType<typeof addPullRequestResponse | typeof removePullRequestResponse>;