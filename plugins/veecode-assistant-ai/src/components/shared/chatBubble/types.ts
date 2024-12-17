
export interface ChatBubbleWrapperProps {
    children: React.ReactNode,
    robot?: boolean
}

export interface ChatBubbleProps {
    robot?:boolean,
    children: React.ReactNode,
    loading?: boolean;
    error?: Error | undefined
}