import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EmptyStateIcon } from "../../icons/empty-state-icon";
import { themeVariables } from "../../utils/constants/themeVariables";

export interface EmptyStateComponentRootProps {
    children: React.ReactNode
}

const useEmptyStateComponentRootStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: themeVariables.background.main,
    padding: '2rem',
  },
  content: {
    padding: '1rem',
    height: '100%',
    color: themeVariables.colors.white,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: '.9rem'
  },
});

export  const EmptyStateComponentRoot : React.FC<EmptyStateComponentRootProps> = ({children}) => {
    const { root, content } = useEmptyStateComponentRootStyles();

    return (
      <Grid
       container
       justifyContent="space-between"
       alignItems="flex-start"
       className={root}
       >
        <Grid className={content}>
            {children}
        </Grid>
        <EmptyStateIcon/>
      </Grid>
    )
}