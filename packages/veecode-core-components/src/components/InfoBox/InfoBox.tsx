import React from "react"
import { InfoBoxRoot, InfoBoxRootProps } from "./InfoBoxRoot"
import { InfoBoxMessage, InfoBoxMessageProps } from "./InfoBoxMessage"
import { InfoBoxDocs, InfoBoxDocsProps } from "./InfoBoxDocs"

export interface InfoBoxProps {
    Root: React.FC<InfoBoxRootProps>,
    Message: React.FC<InfoBoxMessageProps>,
    Docs: React.FC<InfoBoxDocsProps>
};

export interface InfoBoxTypes {
    message: string,
    url?: string
}

export const InfoBox : InfoBoxProps = {
    Root: InfoBoxRoot,
    Message: InfoBoxMessage,
    Docs: InfoBoxDocs
}