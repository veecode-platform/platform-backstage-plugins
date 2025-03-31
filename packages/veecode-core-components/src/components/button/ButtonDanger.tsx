import { makeStyles } from "@mui/styles"
import React from "react"
import { themeVariables } from "../../utils/constants/themeVariables"
import { ButtonRoot } from "./ButtonRoot";

export interface ButtonDangerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 children: React.ReactNode
}

const useButtonDangerStyles = makeStyles({
    danger:{
     backgroundColor: themeVariables.colors.red,
     color: themeVariables.colors.white
    }
});

export const ButtonDanger = React.forwardRef<HTMLButtonElement, ButtonDangerProps>(
    ({ children, ...rest}, ref) => {
        const { danger } = useButtonDangerStyles();
        return (
            <ButtonRoot 
              ref={ref} 
              styles={danger} 
              {...rest}>
                {children}
            </ButtonRoot>
        )
    }
)