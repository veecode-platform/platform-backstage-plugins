import { InstructionsProps } from "../../../utils/types"

export interface PluginListComponentProps {
    data: PluginListProps[],
    instructions: InstructionsProps | null,
    onSaveInstructions: React.Dispatch<React.SetStateAction<InstructionsProps | null>>
}

export interface PluginListProps {
    id: string,
    icon: string | React.JSX.Element | null,
    name: string
}