import React from "react";
import { ButtonProps } from "./types";
import { useButtonStyles } from "./styles";

export const Button : React.FC<ButtonProps> = (props) => {
    const { variant, children } = props;
    const { root, primary, secondary, danger } = useButtonStyles();

    return (
        <button className={`
          ${root}
          ${ variant === "primary" && primary}
          ${ variant === "secondary" && secondary}
          ${ variant === "danger" && danger}
        `}>
            {children}
        </button>
    )
}