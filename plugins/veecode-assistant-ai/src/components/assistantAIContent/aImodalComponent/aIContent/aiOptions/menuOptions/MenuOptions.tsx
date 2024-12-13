import React from "react";
import type { MenuOptionsProps } from "./types";
import { useMenuOptionsStyles } from "./styles";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const MenuOptions : React.FC<MenuOptionsProps> = (props) => {

    const { options } = props;
    const { list,listItem } = useMenuOptionsStyles();
    const navigate = useNavigate();

    const handleNavigate = () => navigate("ai-chat");

    return (
     <Box className={list}>
        { options.map
          (option => 
           (<div 
              key={option.id} 
              className={listItem} 
              onClick={handleNavigate}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleNavigate();
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