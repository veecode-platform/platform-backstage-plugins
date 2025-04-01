import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { Grid, Typography } from "@mui/material";
import { ErrorAnimation } from "../../animations";

export interface FeedbackErrorProps {
    message: string
}

const useFeedBackErrorStyles = makeStyles({
  body: {
    width: '100%',
    position: 'relative',
    padding: '2.5rem 1rem'
  },
  animation: {
    height: '100%',
    position: 'relative',
  },
  textContent: {
    color: themeVariables.colors.white,
    maxWidth: '85%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export const FeedbackError : React.FC<FeedbackErrorProps> = ({message}) => {
    const { body,animation, textContent } = useFeedBackErrorStyles();
    return (
      <Grid container className={body} justifyContent="center" alignItems="center" spacing={3}>
        <Grid size={4} className={animation}>
          <ErrorAnimation width={55} height={50} />
        </Grid>
        <Grid size={7}>
          <Typography variant="h6" className={textContent}>
            {message}
          </Typography>
        </Grid>
      </Grid>
    );
}