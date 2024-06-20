import React from 'react'
import { useErrorMessageComponentStyles } from './styles'
import { Typography } from '@material-ui/core';
import { ErrorMessageComponentProps } from './types';

export const ErrorMessageComponent : React.FC<ErrorMessageComponentProps> = (props) => {

  const { title, message } = props;
  const {content} = useErrorMessageComponentStyles();

  return (
    <div className={content}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{message}</Typography>
    </div>
  )
}
