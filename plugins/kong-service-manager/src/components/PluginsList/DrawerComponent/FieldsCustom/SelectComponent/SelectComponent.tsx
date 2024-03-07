import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import { FormControl, FormLabel } from '@material-ui/core';
import { useStyles } from '../styles';

interface SelectComponentProps {
    label: string,
    items: string[],
    defaultValue?: string
}

export const SelectComponent = ({label, items, defaultValue}:SelectComponentProps) => {
  const { combobox, labelSelect, select } = useStyles();
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
    <FormControl className={combobox}>
      <FormLabel id={`select-label-${label}`} className={labelSelect}>
        {label}
      </FormLabel>
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
    </FormControl>
  );
};

export default SelectComponent;
