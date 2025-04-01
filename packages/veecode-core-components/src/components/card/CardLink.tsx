import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "@backstage/core-components/*";

export interface CardLinkProps {
    path: string,
    children: React.ReactNode
};

const useCardLinkStyles = makeStyles({
  link: {
    textDecoration: 'none !important',
  }
});

export const CardRoot : React.FC<CardLinkProps> = ({path,children}) => {
    const { link } = useCardLinkStyles();
    return (
      <Link className={link} to={path}>
        {children}
      </Link>
    );
}