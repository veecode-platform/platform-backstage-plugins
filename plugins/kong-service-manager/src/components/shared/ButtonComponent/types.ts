import { ReactNode } from "react";

export interface ButtonComponentProps {   
    isDisabled?:boolean,
    classes: string,
    handleClick: ()=>void,
    children: string | ReactNode, 
}