import { makeStyles } from "@mui/styles"
import React from "react"
import { themeVariables } from "../../utils/constants/themeVariables"
import { ButtonRoot } from "./ButtonRoot";

export interface ButtonContainedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 icon?: React.ElementType,
 label: string
}

const useButtonContainedStyles = makeStyles({
  contained: {
    backgroundColor: themeVariables.colors.darkGrey,
    color: themeVariables.colors.white,
  },
});

export const ButtonContained = React.forwardRef<HTMLButtonElement, ButtonContainedProps>(
    ({ label, icon : Icon, ...rest}, ref) => {
        const { contained } = useButtonContainedStyles();
        return (
            <ButtonRoot 
              ref={ref} 
              styles={contained} 
              {...rest}>
                {Icon && (<Icon/>)} {label}
            </ButtonRoot>
        )
    }
)