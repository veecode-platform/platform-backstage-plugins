import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';

interface SelectComponentProps {
    label: string,
    items: string[],
    defaultValue?: string
}

const useStyles = makeStyles({
    combobox:{
        width: '100%',
    },
  select: {
    width: '95%',
  },
});

export const SelectComponent = ({label, items, defaultValue}:SelectComponentProps) => {
  const { combobox, select } = useStyles();
  const [state, setState] = useState<{ name: string | number; value: string }>({name:'name', value:'New Metric'});

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const value = event.target.name as keyof typeof state;
    setState({
      ...state,
      [value]: event.target.value,
    });
  };

  return (
    <div className={combobox}>
    <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
    <Select
      variant="outlined"
      className={select}
      native
      value={defaultValue ?? state.value}
      onChange={handleChange}
      inputProps={{
        name: name,
        id: 'filled-age-native-simple',
      }}
      labelId={`select-label-${label}`} 
      defaultValue={defaultValue}
    >
      {items.map(i => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </Select>
    </div>
  );
};

export default SelectComponent;
