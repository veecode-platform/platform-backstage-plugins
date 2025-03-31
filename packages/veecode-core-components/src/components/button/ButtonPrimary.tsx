import { makeStyles } from "@mui/styles"
import React from "react"
import { themeVariables } from "../../utils/constants/themeVariables"
import { ButtonRoot } from "./ButtonRoot";

export interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 children: React.ReactNode
}

const useButtonPrimaryStyles = makeStyles({
    primary:{
      backgroundColor: themeVariables.colors.main,
       color: themeVariables.colors.black
    }
});

export const ButtonPrimary = React.forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
    ({ children, ...rest}, ref) => {
        const { primary } = useButtonPrimaryStyles();
        return (
            <ButtonRoot 
              ref={ref} 
              styles={primary} 
              {...rest}>
                {children}
            </ButtonRoot>
        )
    }
)