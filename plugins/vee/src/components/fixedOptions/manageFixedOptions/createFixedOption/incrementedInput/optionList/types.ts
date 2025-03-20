import { IOption } from "@veecode-platform/backstage-plugin-vee-common";
import { OptionStateProps } from "../state/optionState/types";

/**
 * @public
 * id?:string,
 * fixed_option_id?: string,
 * label: string,
 * prompt: string,
 * created_at?: Date,
 * updated_at?: Date,
 */
export interface OptionListProps {
    data: IOption[],
    onRemoveOption: (id: string) => void,
    onChangeOption: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    optionState: OptionStateProps,
    onEditOptionFromList: (optionData: IOption) => void,
    onSaveOption: (option: OptionStateProps) => void
}