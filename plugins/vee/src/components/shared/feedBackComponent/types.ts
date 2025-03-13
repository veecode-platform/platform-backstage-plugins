export interface FeedbackComponentProps {
    variant: "loading" | "success" | "error",
    open: boolean,
    onClose?: () => void
    message: string,
    actions?: React.ReactNode
}

export interface FeedbackWrapperProps extends Omit<FeedbackComponentProps, "variant"> {
     children : React.JSX.Element 
}