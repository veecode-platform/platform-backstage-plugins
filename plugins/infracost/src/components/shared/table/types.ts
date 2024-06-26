export type TableData = {
    id: string
}

export type TableProps<T> = {
    labels: string[],
    data: T[]
}