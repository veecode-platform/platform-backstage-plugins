import { makeStyles } from "@material-ui/core";

export const useTableComponentStyle = makeStyles({
    tooltipContent:{
      width: '100%',
    },
    label:{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '320px', 
      display: 'inline-block', 
      verticalAlign: 'middle',
    },
    tags: {
      cursor: 'pointer',
    },
    actions:{
      display: 'flex',
      alignItems: 'center'
    }
  });


  export const tableStyle = {
    width: '100%', 
    height:'100%', 
    background: '#1E1E1E03',
  }
