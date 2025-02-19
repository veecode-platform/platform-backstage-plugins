export interface ChatBubbleWrapperProps {
    children: React.ReactNode,
    robot?: boolean
}

export interface ChatBubbleProps {
    robot?:boolean,
    children: React.ReactNode,
    loading?: boolean;
    analysis?: boolean;
    error?: Error | undefined
}

export interface AvatarComponentProps {
    robot?: boolean
}