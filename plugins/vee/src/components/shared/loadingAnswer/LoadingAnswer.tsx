import React from "react";
import Lottie from "react-lottie";
import { useLoadingAnswerStyles } from "./styles";
import { Box, Typography } from "@material-ui/core";
import { LoadingAnswerProps } from "./types";
import { JsonObject } from "../../../utils/types";
import { getImagePayload } from "../../../utils/helpers/getImagePayload";

export const LoadingAnswer : React.FC<LoadingAnswerProps> = ({analysis}) => {
    
    const[ typingAnimation, setTypingAnimation ] = React.useState<JsonObject|null>(null);
    const [ starsAnimation, setStarsAnimation ] = React.useState<JsonObject|null>(null);
    const {loadingContent, loadingAnalysis, analysisText, block } = useLoadingAnswerStyles();

    React.useEffect(()=>{
      const loadAnimation = async () => {
        const typing = await getImagePayload('typing.json');
        const stars = await getImagePayload('stars.json');
        setTypingAnimation(typing);
        setStarsAnimation(stars);
      };
      loadAnimation();
    },[]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: typingAnimation!,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    const stars = {
      loop: true,
      autoplay: true,
      animationData: starsAnimation!,
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