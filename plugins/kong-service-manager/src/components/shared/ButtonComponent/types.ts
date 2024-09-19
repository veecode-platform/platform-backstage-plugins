// import { CreateCSSProperties } from "@material-ui/core/styles/withStyles";
// import { PropsFunc } from "@material-ui/styles";
// import { CSSProperties } from "react";

import { ReactNode } from "react";

export interface ButtonComponentProps {   
    isDisabled?:boolean,
    classes: string,
    handleClick: ()=>void,
    children: string | ReactNode, 
}