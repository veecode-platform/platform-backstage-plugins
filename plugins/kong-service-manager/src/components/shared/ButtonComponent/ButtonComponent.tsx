import React from 'react';
import { Button } from "@material-ui/core"
import { ButtonComponentProps } from './types';
import { useButtonComponentStyles } from './styles';

export const ButtonComponent : React.FC<ButtonComponentProps>= (props) => {
  
  const {isDisabled, classes,handleClick, children} = props;
  const {root} = useButtonComponentStyles();
    
  return (
    <Button 
      className={
        `${root}
         ${classes ?? {}}`} 
      disabled={isDisabled}
      onClick={handleClick}
      >
      {children}
    </Button>
  )
}