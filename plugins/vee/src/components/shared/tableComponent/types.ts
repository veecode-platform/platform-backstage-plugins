export interface TableComponentProps<T> {
    title: string,
    loading?:boolean,
    error?:Error | string | undefined | null,
    data: T,
    actions?: boolean,
    onEdit?: (id:string) => void,
    onDelete?: () => void
}