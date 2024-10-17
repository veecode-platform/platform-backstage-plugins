export type ChartProps = {
    overview?:boolean;
    items: ChartItem[]
}

export type ChartItem = {
    id?: number,
    value: number,
    label: string
}