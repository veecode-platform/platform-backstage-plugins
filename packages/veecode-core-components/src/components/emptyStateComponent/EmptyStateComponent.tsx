import { EmptyStateComponentDocs } from "./EmptyStateComponentDocs";
import { EmptyStateComponentMessage } from "./EmptyStateComponentMessage";
import { EmptyStateComponentRoot } from "./EmptyStateComponentRoot";
import { EmptyStateComponentTitle } from "./EmptyStateComponentTitle";

export interface EmptyStateComponentProps {
    title: string,
    message: string,
    url?:string
}

export const EmptyStateComponent = {
    Root: EmptyStateComponentRoot,
    Title: EmptyStateComponentTitle,
    Message: EmptyStateComponentMessage,
    Docs: EmptyStateComponentDocs
}