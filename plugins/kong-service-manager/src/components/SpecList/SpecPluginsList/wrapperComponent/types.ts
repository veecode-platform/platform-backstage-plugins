export interface WrapperComponentProps {
    title: string | React.ReactNode,
    buttonBack?:boolean,
    handleBack?: () => void,
    children: React.ReactNode
}