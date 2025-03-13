import { InstructionsProps } from "../../../utils/types";

export interface StepperComponentProps {
    onCloseModal: () => void;
    instructions: InstructionsProps | null;
    resetInstructions: () => void;
    onSaveInstructions: React.Dispatch<React.SetStateAction<InstructionsProps | null>>
}