import { VariablesActionType } from "../../../context/state";

export interface InputFieldProps {
    key: string,
    value: string
}

export interface TextFieldProps {
    setVariables: React.Dispatch<VariablesActionType>,
    setError: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    errors: Record<string, boolean>
}