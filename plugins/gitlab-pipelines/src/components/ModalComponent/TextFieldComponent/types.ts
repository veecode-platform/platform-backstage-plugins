import { VariablesParams } from "../../../utils/types"

export interface InputFieldProps {
    key: string,
    value: string
}

export interface TextFieldProps {
    setVariables: React.Dispatch<React.SetStateAction<VariablesParams[] | null>>,
    setError: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    errors: Record<string, boolean>
}