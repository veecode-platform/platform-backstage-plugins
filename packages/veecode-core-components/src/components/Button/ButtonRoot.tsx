import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";

export interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode | string,
    styles: string
}

const useButtonStyles = makeStyles({
  root: {
    outline: 'none',
    border: 'none',
    borderRadius: '5px',
    minWidth: '200px',
    padding: '.8rem',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all .5s ease-in',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.7rem',
    '&:hover': {
      transform: 'scale(1.04)',
      transition: 'all .5s ease-in-out',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: themeVariables.colors.grey,
      color: themeVariables.colors.dark,
      opacity: 0.6,
    },
  },
});

export const ButtonRoot = React.forwardRef<HTMLButtonElement,ButtonRootProps>(
    ({children, styles, ...rest}, ref) => {
        const { root } = useButtonStyles();
        return (
            <button 
              ref={ref} 
              className={`${root} ${styles}`}
              {...rest}
              >
                {children}
             </button>
        )
    }
)