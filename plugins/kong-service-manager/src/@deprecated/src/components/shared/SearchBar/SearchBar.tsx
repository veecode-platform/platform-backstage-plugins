import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useKongServiceManagerContext } from '../../../context';

const useStyles = makeStyles(theme =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

export const SearchBar = () => {
    
 const {search, searchIcon, inputRoot,inputInput} = useStyles();
 const { setSearchState,searchTerm } = useKongServiceManagerContext();
 
 const handleSearchTerms = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
  setSearchState(event?.target.value)
 }

  return (
    <div className={search}>
    <div className={searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder="Search…"
      onChange={(e)=>handleSearchTerms(e)}
      value={searchTerm}
      classes={{
        root: inputRoot,
        input: inputInput,
      }}
      inputProps={{ 'aria-label': 'search' }}
    />
  </div>
  )
}
