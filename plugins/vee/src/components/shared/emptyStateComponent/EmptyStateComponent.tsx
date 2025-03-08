import React from "react";
import { EmptyStateComponentProps } from "./types";
import { useEmptyStateComponentStyles } from "./styles";
import { Typography } from "@mui/material/";
import { EmptyStateIcon } from "../../../assets/empty-state-icon";
import { Button } from "../button";
import { Grid } from "@material-ui/core";


export  const EmptyStateComponent : React.FC<EmptyStateComponentProps> = (props) => {

    const {title, message, url} = props;
    const { root } = useEmptyStateComponentStyles();

    return (
      <Grid
       container
       justifyContent="space-between"
       alignItems="flex-start"
       className={root}
       >
        <Grid item>
            <Typography variant="h5">😟 {title}</Typography>
            <Typography variant="body1">{message}</Typography>
            {url && <Button title="view doc" variant="primary">View DOC</Button>}
        </Grid>
        <EmptyStateIcon/>
      </Grid>
    )
}