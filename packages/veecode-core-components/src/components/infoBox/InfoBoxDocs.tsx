import { Button } from "@mui/material"
import React from "react"

export interface InfoBoxDocsProps {
    url: string
}

export const InfoBoxDocs: React.FC<InfoBoxDocsProps> = ({ url }) => (
  <Button
    href={url}
    target="_blank"
    style={{ margin: '16px' }}
    size="large"
    variant="contained"
  >
    Docs
  </Button>
);