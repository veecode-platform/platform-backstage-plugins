import React from "react";
import type { MenuOptionsProps } from "./types";
import { useMenuOptionsStyles } from "./styles";
import { Box } from "@material-ui/core";
import { useVeecodeAssistantAIContext } from "../../../../../../context/veecodeAssistantAIProvider";

export const MenuOptions : React.FC<MenuOptionsProps> = (props) => {
  
    const { options } = props;
    const { list,listItem } = useMenuOptionsStyles();
    const { handleChat, setPromptValue } = useVeecodeAssistantAIContext();

    const handleStartChat = (prompt:string)=>{
      setPromptValue(prompt);
     handleChat()
    }

    return (
     <Box className={list}>       
      {
         options.map
            (option => 
             (<div 
                key={option.id} 
                className={listItem} 
                onClick={() => handleStartChat(option.prompt)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleStartChat(option.prompt);
                }}
                aria-label={`Navigate to ${option.label}`}
                >
                {option.label} 
              </div>)
           )
       }
    </Box>
    )
}