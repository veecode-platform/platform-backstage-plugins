import React from "react";
import type { AvatarComponentProps, ChatBubbleProps, ChatBubbleWrapperProps } from "./types";
import { Box } from "@material-ui/core";
import { useChatBubbleStyles } from "./styles";
import { LoadingAnswer } from "../loadingAnswer/LoadingAnswer";
import { AlertBox } from "../alertBox/AlertBox";
import { getImagePayload } from "../../../utils/helpers/getImagePayload";



const AvatarComponent : React.FC<AvatarComponentProps>= (props) => {
 
  const [veeCodeIcon, setVeeCodeIcon] = React.useState<string|null>(null);
  const [personAvatar, setPersonAvatar] = React.useState<string|null>(null);
  const { avatar, avatarImg } = useChatBubbleStyles();
  const { robot } = props;

  React.useEffect(() => {
    const loadImage = async () => {
      const veeCodeIconImg = await getImagePayload('logo-veecode.png');
      const personAvatarImg = await getImagePayload('person.png');
      setVeeCodeIcon(veeCodeIconImg);
      setPersonAvatar(personAvatarImg);
    };
    loadImage();
  },[]);

  return (
    <div className={avatar}>
      <img alt="" src={`${robot ? veeCodeIcon : personAvatar}`} className={avatarImg} />
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