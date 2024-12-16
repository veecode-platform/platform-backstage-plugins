import React from "react";
import { useAIOptionsStyles } from "./styles";
import { ChatBubble, TypingAnimation } from "../../../../shared";
import { MenuOptions } from "./menuOptions";
import FixedOptions from "../../../../../lib/options.json";

export const AIOptions = () => {
   
    const [ typingComplete, setTypingComplete ] = React.useState<boolean>(false);
    const { root } = useAIOptionsStyles();

    const handleTypingComplete = () => {
      setTypingComplete(true);
    };

    return(
        <div className={root}>
          <ChatBubble robot>
              <TypingAnimation 
                text="Perfect, I managed to take a look at your code, now I need you to tell me which instruction to make:" 
                speed={15} 
                onComplete={handleTypingComplete}
                />
              { !typingComplete ? null : (<MenuOptions 
               options={FixedOptions} 
               />)}
          </ChatBubble>
        </div>
    )
}