import React from 'react'
import { TableData, TableProps } from './types'
import { useTableStyles } from './styles';
import { Box, Typography } from '@material-ui/core';
import { transformLabel } from '../../../utils/helpers/transformLabel';


export const Table =  <T extends TableData>(props: TableProps<T>) => {

  const {labels, data } = props;
  const { root, header, th, tbody, tr, cell } = useTableStyles();


  return (
    <div className={root}>
        <Box 
           className={header}>
            {labels.map( label => (
                  <div 
                    className={th} 
                    id={label}>
                    <Typography variant="caption">{transformLabel(label)}</Typography>
                   </div>
              ))}
        </Box>
        <Box
         className={tbody}
         >
          {data.map((row) => (
            <div className={tr} key={row.id}>
                {Object.values(row).map( value => (
                    <div className={cell} key={value}>{value}</div>
                ))}
            </div>
          ))}
        </Box>
    </div>
  )
}
