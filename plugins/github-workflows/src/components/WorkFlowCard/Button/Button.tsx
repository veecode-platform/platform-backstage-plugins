import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    title:{
      paddingLeft: '1.5rem',
      fontSize: '1.5rem'
    },
    cards:{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem'
    },
    button:{
      padding: '.8rem 3rem',
      background: 'transparent',
      border: '1px solid #979696',
      borderRadius: '30px',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }
  });

export const Button = () => {

  const classes = useStyles();

  return (
    <button className={classes.button}>Update-SO</button>
  )
}
