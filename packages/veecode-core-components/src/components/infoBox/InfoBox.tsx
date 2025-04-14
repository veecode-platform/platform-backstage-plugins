import { InfoBoxRoot } from "./InfoBoxRoot"
import { InfoBoxMessage } from "./InfoBoxMessage"
import { InfoBoxDocs } from "./InfoBoxDocs"

export interface InfoBoxProps {
    message: string,
    url?: string
}

export const InfoBox = {
    Root: InfoBoxRoot,
    Message: InfoBoxMessage,
    Docs: InfoBoxDocs
}