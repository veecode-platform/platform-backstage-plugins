export interface IncrementalFieldsProps {
    name: string,
    required: boolean,
    items: string[]|[],
    isMetrics?: boolean,
    setState: React.Dispatch<any>,
    id?: number,
    handleChange?: (key: string, value: string | number | string[], index: number) => void,
    state?: string | string[]
  }