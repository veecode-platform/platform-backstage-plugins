import React from "react";
import { MenuOptionCardProps } from "./types";
import { useMenuOptionCardStyles } from "./styles";
import { Link } from "@backstage/core-components";
import { CardComponent } from "../cardComponent/CardComponent";

export const MenuOptionCard : React.FC<MenuOptionCardProps>= (props) => {

    const { icon, title, description, path, subtitle, tooltip } = props;
    const { link } = useMenuOptionCardStyles();

    return (
       <Link className={link} to={path} title={tooltip ?? ''}>
        <CardComponent
          title={title}
          icon={icon}
          subtitle={subtitle}
          description={description}
          />
       </Link>
    )
}