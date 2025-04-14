import React from "react";
import Chip from "@mui/material/Chip";
import  Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import  Card  from "@mui/material/Card";
import CardMedia  from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import  Avatar  from "@mui/material/Avatar";
import { Link } from "@backstage/core-components";
import Tooltip  from "@mui/material/Tooltip";
import { StackIcon } from "../../../assets/stack-icon";
import { PluginIcon } from "../../../assets/plugin-icon";
import { useCardComponentStyles, useCardElementStyles } from "./styles";
import type { CardProps } from "./types";


const CardElement : React.FC<Omit<CardProps,"path">> = (props) => {
   
    const { /* id,*/ variant, icon, title, subtitle, description, items  } = props;
    const { root , card, content, iconStyle, iconImg, titleStyle, subtitleStyle, descriptionSyle, chips } = useCardElementStyles();

    return (
        <Card className={root}>
            <Box className={card}>
                <CardMedia className={iconStyle}>
                    <Avatar className={iconImg}>
                        {!icon && variant === "stack" && StackIcon }
                        {!icon  && variant === "plugin" && PluginIcon}
                        {!icon && variant === "default" && null}
                        {icon && icon}
                    </Avatar>
                </CardMedia>
                <CardContent className={content}>
                    <Typography component="div" variant="h5" className={titleStyle}>
                    {title}
                    </Typography>
                    {subtitle && (
                    <Tooltip title={subtitle} placement="right-start" arrow>
                        <Typography
                        variant="subtitle1"
                        component="div"
                        className={subtitleStyle}
                        >
                        {subtitle}
                    </Typography>
                    </Tooltip>
                    )}
                    {description && (
                    <Typography
                        variant="body2"
                        component="div"
                        className={descriptionSyle}
                    >
                        {description}
                    </Typography>
                    )}           
                </CardContent>
            </Box>
            {items && (
                <Box className={chips}>
                    <Tooltip 
                        placement="right-start"
                        arrow
                        title={<>
                            {items.map((item: string) => (
                                <Chip
                                    key={item}
                                    label={item}
                                    size="small"
                                />
                                ))}
                            </>}>
                            <Chip
                                label="Available plugins"
                                size="medium"
                            />
                    </Tooltip>
                </Box>
            )}
        </Card>
    )
}

export const CardComponent : React.FC<CardProps> = (props) => {
    
    const { path, ...rest  } = props;
    const { link } = useCardComponentStyles();
   
    if(path) return (
      <Link className={link} to={path}>
        <CardElement {...rest}/>
      </Link>
    );

    return <CardElement {...rest}/>
}