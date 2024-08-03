import React from 'react';
import StringInputList from '../StringInputList/StringInputList';
import { Methods } from "../../../utils/enums/KongRouteMethods";
import { DynamicFieldsProps } from './types';
import { Box, Checkbox, FormControlLabel } from '@material-ui/core';

const DynamicFields: React.FC<DynamicFieldsProps> = (props) => {
  const {
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
  } = props;
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
                  twoFields
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
                  twoFields
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
                  twoFields
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
                            checked ? [...methods, value as string] : methods.filter((m) => m !== value)
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
