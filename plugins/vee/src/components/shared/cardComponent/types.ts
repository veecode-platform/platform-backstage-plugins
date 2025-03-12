export interface CardProps {
    id?: string,
    variant?: "stack" | "plugin" | "default",
    icon?:string | React.JSX.Element,
    title: string,
    subtitle?: string,
    description?: string,
    items?: string[],
    path?:string
}