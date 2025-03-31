import React from "react";

// Criar o botao e tirar essas props

export interface PageLayoutActionrops extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ElementType,
    variant: "primary" | "secondary" | "dark" | "danger" ;
    children: string | React.ReactNode
}

export const PageLayoutAction : React.FC<PageLayoutActionrops> = ({children,...rest}) => {
    return <button {...rest}>{children}</button>
}