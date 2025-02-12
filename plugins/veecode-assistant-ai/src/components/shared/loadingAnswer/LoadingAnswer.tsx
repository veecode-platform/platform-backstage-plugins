import React from "react";
import Lottie from "react-lottie";
import animationData from '../../../assets/lotties/typing.json';
import animationStars from '../../../assets/lotties/stars.json';
import { useLoadingAnswerStyles } from "./styles";
import { Box, Typography } from "@material-ui/core";
import { LoadingAnswerProps } from "./types";

export const LoadingAnswer : React.FC<LoadingAnswerProps> = ({analysis}) => {

    const {loadingContent, loadingAnalysis, analysisText, block } = useLoadingAnswerStyles();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    const stars = {
      loop: true,
      autoplay: true,
      animationData: animationStars,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    return (
    <div className={loadingContent}>
      <>
        { analysis ? (
          <Box className={loadingAnalysis}> 
           <div className={analysisText}>
            <div className={block}> </div>
            <Typography variant="body1">
                Analyzing the code and generating a context ...
              </Typography>
           </div>
              <Lottie
               options={stars}
               height={60}
               width={60}
               style={{position: 'absolute', top: '1.5rem', bottom: '0', right: '1.5rem'}}
              />
          </Box>) 
          : (<Lottie 
              options={defaultOptions}
              height={120}
              width={120}
            />)
          }
      </>
    </div>
  )

}