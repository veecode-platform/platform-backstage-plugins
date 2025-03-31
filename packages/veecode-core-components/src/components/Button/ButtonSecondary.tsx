import { makeStyles } from "@mui/styles"
import React from "react"
import { themeVariables } from "../../utils/constants/themeVariables"
import { ButtonRoot } from "./ButtonRoot";

export interface ButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 label: string,
 icon?: React.ElementType
}

const useButtonSecondaryStyles = makeStyles({
    secondary:{
        backgroundColor: themeVariables.colors.grey,
        color: themeVariables.colors.black
    }
});

export const ButtonSecondary = React.forwardRef<HTMLButtonElement, ButtonSecondaryProps>(
    ({ label, icon: Icon, ...rest}, ref) => {
        const { secondary } = useButtonSecondaryStyles();
        return (
            <ButtonRoot 
              ref={ref} 
              styles={secondary} 
              {...rest}>
               {Icon && <Icon/>} {label}
            </ButtonRoot>
        )
    }
)