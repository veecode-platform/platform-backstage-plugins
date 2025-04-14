import { IOption } from "@veecode-platform/backstage-plugin-vee-common";

export interface IncrementedInputProps {
    onSaveOptions: (options: IOption[]) => void,
    allOptions?: IOption[]
}