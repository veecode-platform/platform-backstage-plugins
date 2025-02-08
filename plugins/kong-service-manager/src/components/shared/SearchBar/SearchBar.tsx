import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useKongServiceManagerContext } from '../../../context';
import { useSearchBarStyles } from './styles';

export const SearchBar = () => {
    
 const {search, searchIcon, inputRoot,inputInput} = useSearchBarStyles();
 const { setSearchState,searchTerm } = useKongServiceManagerContext();
 
 const handleSearchTerms = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
  setSearchState(event?.target.value)
 }

 React.useEffect(()=>{
  setSearchState('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
