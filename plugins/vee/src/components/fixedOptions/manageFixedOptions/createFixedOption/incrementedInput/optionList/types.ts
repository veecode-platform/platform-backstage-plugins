import { IOption } from "@veecode-platform/backstage-plugin-vee-common";
import { OptionStateProps } from "../state/optionState/types";

export interface OptionListProps {
    data: IOption[],
    onRemoveOption: (id: string) => void,
    onChangeOption: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    optionState: OptionStateProps,
    onEditOptionFromList: (optionData: IOption) => void,
    onSaveOption: (option: OptionStateProps) => void
}