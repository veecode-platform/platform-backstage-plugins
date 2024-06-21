import React from 'react'
import { useAnalysisComponentStyles } from './styles'
import { Typography } from '@material-ui/core';
import { BsStars } from 'react-icons/bs';
import { AnalysisComponentProps, FormatedContentProps } from './types';
import { parseString } from '../../../../../utils/helpers/parseString';

const FormatedContent : React.FC<FormatedContentProps> = ({contentString}) => {
  const { message } = useAnalysisComponentStyles();
  const parsedAnalyses : string[] = parseString(contentString);

  return(
    <div className={message}>
      {parsedAnalyses.map(analysis => <p key={analysis}>{analysis}</p>)}
    </div>
  )
}


export const AnalysisComponent : React.FC<AnalysisComponentProps> = (props) => {

  const { solution } = props;
  const { content, label } = useAnalysisComponentStyles();

  return (
    <div className={content}>
      <div className={label}>
        <BsStars size={22}/>
        <Typography variant="h6"> Suggested actions </Typography>
      </div>
      <div>
          <FormatedContent contentString={solution}/>
      </div>
    </div>
  )
}
