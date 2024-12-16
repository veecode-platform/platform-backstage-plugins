import React from "react";
import type { MenuOptionsProps } from "./types";
import { useMenuOptionsStyles } from "./styles";
import { Box } from "@material-ui/core";
import { useVeecodeAssistantAIContext } from "../../../../../../context/veecodeAssistantAIProvider";

export const MenuOptions : React.FC<MenuOptionsProps> = (props) => {
  
    const { options } = props;
    const { list,listItem } = useMenuOptionsStyles();
    const { handleChat } = useVeecodeAssistantAIContext();

    return (
     <Box className={list}>       
      {
         options.map
            (option => 
             (<div 
                key={option.id} 
                className={listItem} 
                onClick={handleChat}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleChat();
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