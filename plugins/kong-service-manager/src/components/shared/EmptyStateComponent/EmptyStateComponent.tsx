import { EmptyState } from '@backstage/core-components'
import { Button } from '@material-ui/core'
import React from 'react'

export const EmptyStateComponent = () => {
  return (
    <EmptyState
    missing="data"
    title="No Kong Data"
    description="This component has Kong Plugin enabled, but no data was found..."
    action={
      <Button
        variant="contained"
        color="primary"
        href="/"
      >
        Back to Home
      </Button>
    }
  />
  )
}
