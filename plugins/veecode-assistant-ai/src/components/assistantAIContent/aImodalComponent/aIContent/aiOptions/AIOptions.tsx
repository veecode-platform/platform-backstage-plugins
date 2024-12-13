import React from "react";
import { useAIOptionsStyles } from "./styles";
import { ChatBubble } from "../../../../shared";
import { Typography } from "@material-ui/core";
import { MenuOptions } from "./menuOptions";
import FixedOptions from "../../../../../lib/options.json";

export const AIOptions = () => {
    const { root } = useAIOptionsStyles();

    return(
        <div className={root}>
          <ChatBubble robot>
             <Typography variant="body1">
              Perfect, I managed to take a look at your code, now I need you to tell me which instruction to make:
             </Typography>
             <MenuOptions 
               options={FixedOptions} 
               />
          </ChatBubble>
        </div>
    )
}