export interface RecordFieldsProps {
    inputName: string,
    required: boolean,
    defaultValues: any[]|[],
    recordFields: any[]|[],
    setConfig: React.Dispatch<any>
  }

export type InputFieldType = {
  name: string,
  [key:string]: any
}

export type RecordFieldsType = {
  objectKey: string,
  name: string[],
  stat_type: string[],
  tags?: string[],
  sample_rate?: number,
  consumer_identifier: string[]
}

export type RecordStateType = {
  [key: string]: { [key: string]: any }[];
}

export type NewItemType = {
  [key:string]: any
}
