import React from 'react'
import { TableData, TableProps } from './types'
import { useTableStyles } from './styles';
import { Typography } from '@material-ui/core';
import { transformLabel } from '../../../utils/helpers/transformLabel';


export const Table =  <T extends TableData>(props: TableProps<T>) => {

  const {labels, data } = props;
  const { root, header, th, tbody, tr, cell, cellContent } = useTableStyles();

  return (
    <table className={root}>
        <thead className={header}>
           {labels.map( label => (
             <th 
               className={th} 
               id={label}
               key={label}
               >
               <Typography variant="caption">{transformLabel(label)}</Typography>
             </th>
           ))}
        </thead>
        <tbody className={tbody}>
          {data.map((row) => (
            <tr className={tr} key={row.id}>
                {Object.values(row).map( value => (
                    <td className={cell} key={value}>
                      <p title={value} className={cellContent}>{value}</p>
                    </td>
                ))}
            </tr>
          ))}
        </tbody>
    </table>
  )
}
