import React from 'react';
import { IKongServices } from '../../interfaces';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

type KongServicesArray = {
  services: IKongServices[];
  value: any;
  setValue: any;
  selected?: kongServiceOption | null;
  disabled?: boolean;
};

type kongServiceOption = {
  id: string;
  name: string;
}

export const KongServicesListComponent = ({
  services,
  value,
  setValue,
  selected,
  disabled
}: KongServicesArray) => {

  const options = services.map(item=>{
    return{
      name: item.name,
      id: item.id
    }
  })
  return (

    <Autocomplete
      id="search-kong-services"
      placeholder='Services'
      options={options}
      disabled={disabled}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Kong service" variant="outlined" />}
      value={selected}
      getOptionSelected={(option, value) => option.name === value.name}
      /*renderOption={(option) => (
        <div style={{display:"flex", flexDirection:"column"}}>
          <span><b>{option.name}</b></span>
          <span style={{color:"lightgray"}}>{option.id}</span>
        </div>
      )}*/
      onChange={
        (_event:any, newValue:kongServiceOption | null) =>{
          setValue({...value, kongServiceName: newValue?.name || "", kongServiceId: newValue?.id || ""});
        }
      }    
    />
  );
};
