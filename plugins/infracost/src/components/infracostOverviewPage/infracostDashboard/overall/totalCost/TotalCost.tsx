import React from 'react'
import { TotalCostProps } from './types'
import { Wrapper } from '../../../../shared'
import { useTheme } from '@material-ui/core'
import { useTotalCostStyles } from './styles'

export const TotalCost : React.FC<TotalCostProps> = (props) => {
  
  const { total } = props;
  const theme = useTheme();
  const { content } = useTotalCostStyles();

  return (
    <Wrapper 
     styles={{ 
      borderLeft: `2px solid ${theme.palette.linkHover}`
    }}>
      <div className={content}>
        Total cost: <strong>$ {total ?? '0'}</strong>
      </div>
    </Wrapper>
  )
}
