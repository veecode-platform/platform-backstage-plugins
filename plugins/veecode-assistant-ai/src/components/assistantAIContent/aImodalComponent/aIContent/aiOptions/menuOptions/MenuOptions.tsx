import React from "react";
import type { MenuOptionsProps } from "./types";
import { useMenuOptionsStyles } from "./styles";
import { Box } from "@material-ui/core";

export const MenuOptions : React.FC<MenuOptionsProps> = (props) => {

    const { options } = props;
    const { list,listItem } = useMenuOptionsStyles();

    return (
     <Box className={list}>
        { options.map
          (option => 
           (<div key={option.id} className={listItem}>
             {option.label}
            </div>)
         )
         }
      </Box>
    )
}