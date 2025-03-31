import { FeedbackActions } from "./FeedbackActions"
import { FeedbackAILoading } from "./FeedbackAILoading"
import { FeedbackError } from "./FeedBackError"
import { FeedbackRoot } from "./FeedbackRoot"
import { FeedbackSuccess } from "./FeedbackSuccess"

export interface FeedbackProps {
    open: boolean,
    onClose?: () => void
    message: string,
    actions?: React.ReactNode
}

export const Feedback = {
    Root: FeedbackRoot,
    Success: FeedbackSuccess,
    Error: FeedbackError,
    AILoading: FeedbackAILoading,
    Actions: FeedbackActions
}