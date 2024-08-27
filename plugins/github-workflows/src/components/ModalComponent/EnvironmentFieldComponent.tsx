import React, { memo } from 'react';
import { FormControl,InputLabel, MenuItem, Select} from '@material-ui/core';
import { useGithuWorkflowsContext } from '../../context';
import useAsync from 'react-use/lib/useAsync';
import { useModalStyles } from './styles';
import { Skeleton } from '@material-ui/lab';
import { InfoBox } from '../shared';
import { EnvironmentFieldProps } from './types';


const EnvironmentFieldComponent : React.FC<EnvironmentFieldProps> = ({name,description,value, defaultValue, required,onSelect,onTouch})=> {

    const { listAllEnvironments } = useGithuWorkflowsContext();
    const {label,formControl} = useModalStyles();

    const {error, loading, value: options} = useAsync(async()=>{
        const data = await listAllEnvironments();
        const environmentOptions : string[] = [''];
        if(data && data.environments){
            data.environments.map(environment => environmentOptions.push(environment.name))
        }
        return environmentOptions
    })

    if(loading) return <Skeleton animation="wave" height="90px"/>

    if(error) return <h1>Erro ....</h1>

    return (
        <FormControl variant="outlined" className={formControl} >
        <InputLabel className={label} id={name}>{description !== '' ? description : 'Select the environment'}</InputLabel>
        { 
          (options && options.length > 0) 
            ? (<Select
                  labelId={name}
                  id="select-outlined"
                  value={value ?? defaultValue} 
                  onChange={onSelect}
                  label={description}
                  required={required as boolean}
                  name={name}
                  onBlur={(event) => onTouch(event,required)}
                  variant="filled"
                    >
                    {options!.map(e => (
                      <MenuItem value={e} key={e}>
                          <em>{e}</em>
                      </MenuItem>
                    ))}
                </Select>):
             (<InfoBox message="Environments Not Found"/>)
         }
       </FormControl>
    );
  }

  export default memo(EnvironmentFieldComponent)