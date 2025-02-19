import React from "react";
import { TypingAnimationProps } from "./types";
import { Typography } from "@material-ui/core";

export const TypingAnimation : React.FC<TypingAnimationProps> = (props) => {

    const [displayText, setDisplayText] = React.useState("");
    const { text, speed = 50 , onComplete} = props;
  
    React.useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
          onComplete();
        }
      }, speed);
      return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, speed]);
  
    return  <Typography variant="body1">{displayText}</Typography>;
  };