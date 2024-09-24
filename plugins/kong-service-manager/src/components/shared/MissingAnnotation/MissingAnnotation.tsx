import React from 'react'
import { useMissingAnnotationStyles } from './styles'
import { MissingAnnotationProps } from './types';
import { MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';

export const MissingAnnotation : React.FC<MissingAnnotationProps> = (props) => {

  const { root } = useMissingAnnotationStyles();
  const { annotation } = props;

  return (
    <div className={root}>
        <MissingAnnotationEmptyState annotation={annotation}/>
    </div>
  )
}
