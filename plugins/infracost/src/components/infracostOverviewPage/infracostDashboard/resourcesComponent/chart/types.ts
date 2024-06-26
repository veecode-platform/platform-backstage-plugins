export type ChartProps = {
    items: ChartItem[]
}

export type ChartItem = {
    id?: number,
    value: number,
    label: string
}