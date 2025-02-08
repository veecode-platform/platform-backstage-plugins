import { RouteDetailsProps } from "../../../utils/types";

export interface PullRequestModalProps {
    specName: string,
    show: boolean,
    handleCloseModal: () => void,
    route?: RouteDetailsProps
}

export interface PullRequestResponse {
    status: "success" | "error",
    message: string,
}