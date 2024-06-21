import React from 'react'
import { useErrorAnalysisStyles } from './styles';
import { FcInfo } from "react-icons/fc";
import { Typography } from '@material-ui/core';
import { ErrorCard } from './ErrorCard';
import { ErrorAnalysisProps } from './types';

export const ErrorAnalysis : React.FC<ErrorAnalysisProps> = (props) => {
  
  const {container,infoBar,content} = useErrorAnalysisStyles();
  const { errors, messages } = props;

  return (
      <div className={container}>
        <div className={infoBar}>
          <FcInfo size={26} />
          <Typography variant="subtitle2">
            {errors} Errors found, click on analyze error to generate a solution
          </Typography>
        </div>
        <div className={content}>
          {messages.map( message => 
              (<ErrorCard 
                key={message.metadata.uid} 
                message={message.spec}
                />)
           )}
        </div>
      </div>
  );
}