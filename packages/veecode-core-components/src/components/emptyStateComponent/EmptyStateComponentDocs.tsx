import { Button } from "@mui/material"
import React from "react"

export interface EmptyStateComponentDocsProps {
    url: string
}

export const EmptyStateComponentDocs : React.FC<EmptyStateComponentDocsProps> = ({url}) => (
    <Button href={url} title="view doc" variant="contained">View DOC</Button>
)