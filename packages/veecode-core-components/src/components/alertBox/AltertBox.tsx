import { AlertBoxError } from "./AlertBoxError"
import { AlertBoxInfo } from "./AlertBoxInfo"
import { AlertBoxRoot } from "./AlertBoxRoot"
import { AlertBoxSuccess } from "./AlertBoxSuccess"
import { AlertBoxWarning } from "./AlertBoxWarning"

export interface AlertBoxProps {
    open: boolean,
    variant: "persistent" | "transient",
    children: string
}

export const AlertBox = {
    Root: AlertBoxRoot,
    Success: AlertBoxSuccess,
    Warning: AlertBoxWarning,
    Error: AlertBoxError,
    Info: AlertBoxInfo
}