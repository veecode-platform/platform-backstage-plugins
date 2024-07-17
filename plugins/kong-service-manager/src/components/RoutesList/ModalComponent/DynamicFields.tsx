import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';
import StringInputList from '../StringInputList/StringInputList';
import { Methods } from "../../../utils/enums/KongRouteMethods";
import { DynamicFieldsProps } from './types';

const DynamicFields: React.FC<DynamicFieldsProps> = ({
  protocolDescription,
  hosts,
  paths,
  snis,
  headers,
  sources,
  destinations,
  methods,
  handleChange,
  setHosts,
  setPaths,
  setSnis,
  setHeaders,
  setSources,
  setDestinations,
  setMethods,
}) => {
  const fields = protocolDescription.split(', ');

  return (
    <>
      {fields.map((field, index) => {
        switch (field.toLowerCase()) {
          case 'hosts':
            return (
              <Box key={index} sx={{ p: 2 }}>
                <StringInputList
                  label="Hosts"
                  buttonText="Add"
                  onItemsChange={(items) => handleChange(items, setHosts)}
                  initialItems={hosts}
                />
              </Box>
            );
          case 'paths':
            return (
              <Box key={index} sx={{ p: 2 }}>
                <StringInputList
                  label="Paths"
                  buttonText="Add"
                  onItemsChange={(items) => handleChange(items, setPaths)}
                  initialItems={paths}
                />
              </Box>
            );
          case 'snis':
            return (
              <Box key={index} sx={{ p: 2 }}>
                <StringInputList
                  label="SNIs"
                  buttonText="Add"
                  onItemsChange={(items) => handleChange(items, setSnis)}
                  initialItems={snis}
                />
              </Box>
            );
          case 'headers':
            return (
              <Box key={index} sx={{ p: 2 }}>
                <StringInputList
                  label="Headers"
                  buttonText="Add"
                  onItemsChange={(items) => handleChange(items, setHeaders)}
                  initialItems={headers}
                  twoFields={true}
                />
              </Box>
            );
          case 'sources':
            return (
              <Box key={index} sx={{ p: 2 }}>
                <StringInputList
                  label="Sources"
                  buttonText="Add"
                  onItemsChange={(items) => handleChange(items, setSources)}
                  initialItems={sources}
                  twoFields={true}
                />
              </Box>
            );
          case 'destinations':
            return (
              <Box key={index} sx={{ p: 2 }}>
                <StringInputList
                  label="Destinations"
                  buttonText="Add"
                  onItemsChange={(items) => handleChange(items, setDestinations)}
                  initialItems={destinations}
                  twoFields={true}
                />
              </Box>
            );
          case 'methods':
            return (
              <Box sx={{ p: 2 }}>
                {Object.values(Methods).map((method) => (
                  <FormControlLabel
                    key={method}
                    control={
                      <Checkbox
                        checked={methods.includes(method)}
                        onChange={(event) =>
                          handleChange(event, setMethods, (value, checked) =>
                            checked ? [...methods, value as string] : methods.filter((method) => method !== value)
                          )
                        }
                        value={method}
                      />
                    }
                    label={method}
                  />
                ))}
              </Box>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicFields;
