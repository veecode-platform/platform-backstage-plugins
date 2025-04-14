import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, CardMedia } from "@mui/material";


export interface OptionCardIconProps {
    icon: React.ElementType;
}

const useOptionCardIconStyles = makeStyles({
    iconStyle:{
        display: "flex",
        alignItems: 'flex-start',
        justifyContent: "center",
        height: "100%"
       },
    iconImg: {
        width: '60px',
        height: '60px',
        backgroundColor: 'transparent'
    }
})

export const OptionCardIcon : React.FC<OptionCardIconProps> = ({ icon : Icon }) => {
    const { iconStyle, iconImg } = useOptionCardIconStyles();
    return (
        <CardMedia className={iconStyle}>
           <Avatar className={iconImg}>
              <Icon width={40} height={40} />
            </Avatar>
        </CardMedia>
    )
}