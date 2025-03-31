import { makeStyles } from "@mui/styles"
import React from "react"
import { themeVariables } from "../../utils/constants/themeVariables"
import { ButtonRoot } from "./ButtonRoot";

export interface ButtonDangerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 icon?: React.ElementType,
 label: string
}

const useButtonDangerStyles = makeStyles({
    danger:{
     backgroundColor: themeVariables.colors.red,
     color: themeVariables.colors.white
    }
});

export const ButtonDanger = React.forwardRef<HTMLButtonElement, ButtonDangerProps>(
    ({ label, icon: Icon, ...rest}, ref) => {
        const { danger } = useButtonDangerStyles();
        return (
            <ButtonRoot 
              ref={ref} 
              styles={danger} 
              {...rest}>
                {Icon && (<Icon/>)} {label}
            </ButtonRoot>
        )
    }
)