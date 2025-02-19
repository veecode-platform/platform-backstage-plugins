import React from "react";
import type { AvatarComponentProps, ChatBubbleProps, ChatBubbleWrapperProps } from "./types";
import { Box } from "@material-ui/core";
import { useChatBubbleStyles } from "./styles";
import { LoadingAnswer } from "../loadingAnswer/LoadingAnswer";
import { AlertBox } from "../alertBox/AlertBox";
import { LogoVeecode } from "../../../assets/logo-veecode";
import { Person } from "../../../assets/person";


const AvatarComponent : React.FC<AvatarComponentProps>= (props) => {

  const { avatar } = useChatBubbleStyles();
  const { robot } = props;


  return (
    <div className={avatar}>
      {robot ? <LogoVeecode/> : <Person/>}
    </div>
  );
}

const ChatBubbleWrapper : React.FC<ChatBubbleWrapperProps> = (props) => {

  const { children, robot } = props;
  const { root } = useChatBubbleStyles();

  return (
      <Box className={root}>
        <AvatarComponent robot={robot}/>
        {children}
     </Box>
  )
}

export const ChatBubble : React.FC<ChatBubbleProps> = (props) => {
    const { robot, children, loading, analysis, error } = props;
    const { root, loadingContent, bubble, aiBubble, content} = useChatBubbleStyles();

    if(loading) return (
      <ChatBubbleWrapper robot={robot}>
        <Box className={`${loadingContent} ${robot ? aiBubble : ''}`}>
         <LoadingAnswer analysis={!!analysis}/>
        </Box>
      </ChatBubbleWrapper>
    )

    if(error) return (
      <ChatBubbleWrapper robot={robot}>
        <AlertBox variant="error" message={error.message}/>
      </ChatBubbleWrapper>
    )

    return (
        <Box className={root}>
        <AvatarComponent robot={robot}/>  
          <Box className={`${bubble} ${robot ? aiBubble : ''}`}>
              <div className={content}>
                {children}
              </div>
          </Box>       
       </Box>
    )
}