import { makeStyles } from "@material-ui/core";

export const useTableComponentStyle = makeStyles({
    tooltipContent:{
      width: '100%'
    },
    tags: {
      cursor: 'pointer',
    },
    actions:{
      display: 'flex',
      alignItems: 'center'
    }
  })