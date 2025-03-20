import { IOption } from "@veecode-platform/backstage-plugin-vee-common";

export interface OptionListProps {
    data: IOption[],
    onRemoveOption: (id: string) => void,
    onEditOptionFromList: (optionData: IOption) => void
}