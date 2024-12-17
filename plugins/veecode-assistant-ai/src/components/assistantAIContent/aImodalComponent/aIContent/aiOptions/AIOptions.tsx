import React from "react";
import { useAIOptionsStyles } from "./styles";
import { ChatBubble, TypingAnimation } from "../../../../shared";
import { MenuOptions } from "./menuOptions";
import FixedOptions from "../../../../../lib/options.json";
import { AIOptionsProps } from "./type";

export const AIOptions : React.FC<AIOptionsProps> = (props) => {
   
    const { loading,error } = props;
    const [ typingComplete, setTypingComplete ] = React.useState<boolean>(false);
    const { root } = useAIOptionsStyles();

    const handleTypingComplete = () => {
      setTypingComplete(true);
    };

    React.useEffect(()=>{
      // eslint-disable-next-line no-console
      console.log("AQUI O ERRO >>>", error)
    },[error])

    return(
        <div className={root}>
          <ChatBubble robot loading={loading} error={error}>
              <TypingAnimation 
                text="Perfect, I managed to take a look at your code, now I need you to tell me which instruction to make:" 
                speed={15} 
                onComplete={handleTypingComplete}
                />
              { !typingComplete ? null : <MenuOptions options={FixedOptions} />}
          </ChatBubble>
        </div>
    )
}