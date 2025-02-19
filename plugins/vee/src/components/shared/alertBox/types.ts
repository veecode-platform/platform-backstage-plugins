export interface AlertBoxWrapperProps {
    children: React.ReactNode,
    style: string
}

export interface AlertBoxProps {
    variant: "error" | "warning" | "success",
    message: string
}