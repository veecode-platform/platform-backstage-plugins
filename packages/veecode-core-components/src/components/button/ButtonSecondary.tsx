import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { ButtonRoot } from "./ButtonRoot";

export interface ButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 children: React.ReactNode,
}

const useButtonSecondaryStyles = makeStyles({
    secondary:{
        backgroundColor: themeVariables.colors.grey,
        color: themeVariables.colors.black
    }
});

export const ButtonSecondary = React.forwardRef<HTMLButtonElement, ButtonSecondaryProps>(
    ({ children, ...rest}, ref) => {
        const { secondary } = useButtonSecondaryStyles();
        return (
            <ButtonRoot 
              ref={ref} 
              styles={secondary} 
              {...rest}>
              {children}
            </ButtonRoot>
        )
    }
)