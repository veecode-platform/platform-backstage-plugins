import { FormControl, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(theme=>({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
      }
}))

export const SubFields = (fields:any) => {

    const { formControl } = useStyle();

    const [age, setAge] = React.useState('');

    const handleChange = (event:any) => {
      setAge(event.target.value);
    };

    // eslint-disable-next-line no-console
    console.log(fields.fields)

    return (
        <FormControl variant="outlined" className={formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
        {
            fields.fields.map((f:any) => (
                <MenuItem value={10}>{f.name ?? ''}</MenuItem> 
                // TO DO
            ))
        }
        </Select>
      </FormControl>
    )
  }