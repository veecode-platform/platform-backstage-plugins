export interface TableComponentProps<T> {
    title: string
    data: T,
    noId?: boolean,
    actions?: boolean,
    onEdit?: () => void,
    onDelete?: () => void
}