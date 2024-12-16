import React from "react";
import type { ChatBubbleProps } from "./types";
import { Box } from "@material-ui/core";
import { useChatBubbleStyles } from "./styles";
import VeeCodeIcon from "../../../assets/logo-veecode.png";
import PersonAvatar from "../../../assets/person.png";
import { LoadingAnswer } from "../loadingAnswer/LoadingAnswer";

export const ChatBubble : React.FC<ChatBubbleProps> = (props) => {
    const { robot, children, loading } = props;
    const { root, loadingContent, bubble, aiBubble, avatar, avatarImg, content} = useChatBubbleStyles();

    return (
        <Box className={root}>
        <div className={avatar}>
          <img alt="" src={`${robot ? VeeCodeIcon : PersonAvatar}`} className={avatarImg} />
        </div>
        {loading ? <Box className={`${loadingContent} ${robot ? aiBubble : ''}`}><LoadingAnswer/></Box> :(
            <Box
            className={`${bubble} ${robot ? aiBubble : ''}`}>
             <div className={content}>
               {children}
             </div>
           </Box>
        )}
       </Box>
    )
}