import React from "react";
import { Box, Typography } from "@material-ui/core";
import { MenuOptionCardProps } from "./types";
import { useMenuOptionCardStyles } from "./styles";
import { Link } from "@backstage/core-components";

export const MenuOptionCard : React.FC<MenuOptionCardProps>= (props) => {

    const { icon, title, description, path, tooltip } = props;
    const { link, root, titleBar, body } = useMenuOptionCardStyles();

    return (
       <Link className={link} to={path} title={tooltip ?? ''}>
        <Box className={root}>
         {icon}
         <div className={titleBar}>
           <Typography variant="h6">{title}</Typography>
         </div>
         {description && (
            <div className={body}>
            <Typography variant="body1">
                {description}
            </Typography>
            </div>
         )}
       </Box>
       </Link>
    )
}