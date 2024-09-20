export interface PullRequestModalProps {
    specName: string,
    show: boolean,
    handleCloseModal: () => void,
}

export interface PullRequestResponse {
    status: "success" | "error",
    message: string,
}