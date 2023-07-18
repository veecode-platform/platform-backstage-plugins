import { makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode | string
}

const useStyles = makeStyles(theme =>({
    button:{
      padding: '.8rem 3rem',
      background: 'transparent',
      border: '1px solid #979696',
      borderRadius: '30px',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      color: theme.palette.text.primary,
      minWidth: '235px',
    }
  }));

export const Button = ({children}:ButtonProps) => {

  const classes = useStyles();

  return (
    <button className={classes.button}>
      {children}
    </button>
  )
}
