import React from "react";
import { ButtonProps } from "./types";
import { useButtonStyles } from "./styles";

export const Button : React.FC<ButtonProps> = (props) => {
    const { variant, children, ...rest} = props;
    const { root, primary, secondary, dark, danger } = useButtonStyles();

    return (
        <button className={`
          ${root}
          ${ variant === "primary" && primary}
          ${ variant === "secondary" && secondary}
          ${ variant === "dark" && dark}
          ${ variant === "danger" && danger}
        `}
         {...rest}
        >
            {children}
        </button>
    )
}