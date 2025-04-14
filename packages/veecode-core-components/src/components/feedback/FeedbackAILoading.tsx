import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { Grid, Typography } from "@mui/material";
import { AILoadingAnimation } from "../../animations";

export interface FeedbackAILoadingProps {
    message: string
}

const useFeedBackAILoadingStyles = makeStyles({
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

export const FeedbackAILoading : React.FC<FeedbackAILoadingProps> = ({message}) => {
    const { body,animation, textContent } = useFeedBackAILoadingStyles();
    return (
        <Grid container className={body} justifyContent="center" alignItems="center" spacing={3}>
         <Grid size={4} className={animation}>
           <AILoadingAnimation width={90} height={90}/>
          </Grid>
          <Grid size={7}>
              <Typography variant="h6" className={textContent}>
                {message}
              </Typography>
           </Grid>
      </Grid>
    )
}