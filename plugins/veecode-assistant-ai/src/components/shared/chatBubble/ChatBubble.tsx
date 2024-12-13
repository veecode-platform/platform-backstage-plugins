import React from "react";
import type { ChatBubbleProps } from "./types";
import { Box } from "@material-ui/core";
import { useChatBubbleStyles } from "./styles";
import VeeCodeIcon from "../../../assets/veecodeIcon.png";
import PersonAvatar from "../../../assets/person.png";

export const ChatBubble : React.FC<ChatBubbleProps> = (props) => {
    const { robot, children } = props;
    const { root, aiBubble, avatar, avatarImg, content} = useChatBubbleStyles();

    return (
        <Box
         className={`${root} ${robot ? aiBubble : ''}`}>
            <div className={avatar}>
             <img alt="" src={`${robot ? VeeCodeIcon : PersonAvatar}`} className={avatarImg} />
            </div>
            <div className={content}>
                {children}
            </div>
        </Box>
    )
}