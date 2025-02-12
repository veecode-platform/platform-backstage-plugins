import React from "react";
import type { ChatBubbleProps, ChatBubbleWrapperProps } from "./types";
import { Box } from "@material-ui/core";
import { useChatBubbleStyles } from "./styles";
import VeeCodeIcon from "../../../assets/logo-veecode.png";
import PersonAvatar from "../../../assets/person.png";
import { LoadingAnswer } from "../loadingAnswer/LoadingAnswer";
import { AlertBox } from "../alertBox/AlertBox";

const ChatBubbleWrapper : React.FC<ChatBubbleWrapperProps> = (props) => {
  const { children, robot } = props;
  const { root, avatar, avatarImg } = useChatBubbleStyles();

  return (
      <Box className={root}>
        <div className={avatar}>
          <img alt="" src={`${robot ? VeeCodeIcon : PersonAvatar}`} className={avatarImg} />
        </div>
        {children}
     </Box>
  )
}

export const ChatBubble : React.FC<ChatBubbleProps> = (props) => {
    const { robot, children, loading, analysis, error } = props;
    const { root, loadingContent, bubble, aiBubble, avatar, avatarImg, content} = useChatBubbleStyles();

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
        <div className={avatar}>
          <img alt="" src={`${robot ? VeeCodeIcon : PersonAvatar}`} className={avatarImg} />
        </div>   
          <Box className={`${bubble} ${robot ? aiBubble : ''}`}>
              <div className={content}>
                {children}
              </div>
          </Box>       
       </Box>
    )
}