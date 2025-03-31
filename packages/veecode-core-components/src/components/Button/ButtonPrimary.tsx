import { makeStyles } from "@mui/styles"
import React from "react"
import { themeVariables } from "../../utils/constants/themeVariables"
import { ButtonRoot } from "./ButtonRoot";

export interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 icon?: React.ElementType,
 label: string
}

const useButtonPrimaryStyles = makeStyles({
    primary:{
      backgroundColor: themeVariables.colors.main,
       color: themeVariables.colors.black
    }
});

export const ButtonPrimary = React.forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
    ({ label, icon: Icon, ...rest}, ref) => {
        const { primary } = useButtonPrimaryStyles();
        return (
            <ButtonRoot 
              ref={ref} 
              styles={primary} 
              {...rest}>
                {Icon && <Icon/> } {label}
            </ButtonRoot>
        )
    }
)