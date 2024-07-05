import React from 'react';
import { OptionsPickerProps } from "./schema";
import { Box,Divider, FormControl, FormHelperText, TextField, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { SelectItem } from '@backstage/core-components';
import { Autocomplete, AutocompleteChangeReason } from '@material-ui/lab';
import { SkeletonComponent } from './skeletonComponent';

export { OptionsPickerSchema } from './schema';

export const OptionsPicker : React.FC<OptionsPickerProps> = (props) => {

  const [propertySelected, setPropertySelected ]= React.useState<string|null>(null);
  const [loading, setLoading] = React.useState<boolean>(false)
  const {uiSchema,schema,onChange,formData,required,rawErrors,idSchema,formContext} = props;
  const [optionsState, setOptionsState] = React.useState<string[]|[]>([]);
  const [ key, property] = resolveUiSchema(uiSchema);
  const { autocompleteWrapper,descriptionContent,boxInfo } = useStyles();

  const items: SelectItem[] | SelectItem  = optionsState
    ? optionsState.map(i => ({ label: i, value: i }))
    : [{ label: 'Loading...', value: 'loading' }];

  const onSelect = React.useCallback(
    (_: any, ref: string | null, reason: AutocompleteChangeReason) => {
      if (typeof ref === 'string' && ref) {
        onChange(ref);
      } else {
        if (reason === 'blur' || reason === 'create-option') {
          let entityRef = ref;
          try {
            entityRef = JSON.stringify(entityRef!)
          } catch (err) {
            // If the passed in value isn't an entity ref, do nothing.
          }
          if (formData !== entityRef) {
            onChange(entityRef! as string);
          }
        }
      }
    },
    [onChange, formData]
  );

    React.useEffect(()=>{
      if(key && property){
        setLoading(true);
        const context = formContext;
        const options = context.formData[key][property] as string[];
        if(options){
          options.map(option => setOptionsState(prevState => [...prevState, option]));
        }
        setTimeout(()=>{setLoading(false)},1000)
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[key,property]);

    React.useEffect(()=>{
      if(formData){
        setPropertySelected(formData)
      }
    },[onChange, formData]);

    if(loading) return (
      <SkeletonComponent 
        title={schema.title ?? 'Options Picker'} 
        description={schema.description ?? 'Choose an option from a result coming from the selected resourcePicker'} 
       />
     )

    return (
      <>
        <Box my={1}>
          <Typography variant="h5">
            {schema.title ?? 'Options Picker'}
          </Typography>
          <Divider />
        </Box>
        <Box className={descriptionContent}>
          <Typography variant="body1">
            {schema.description ??
              'Choose an option from a result coming from the selected resourcePicker'}
          </Typography>
        </Box>
        <>
          {optionsState.length > 0 ? (
            <FormControl
              margin="normal"
              required={required}
              error={rawErrors?.length > 0 && !formData}
            >
              <Autocomplete
                disabled={items.length === 1}
                className={autocompleteWrapper}
                id={idSchema?.$id}
                value={propertySelected ? propertySelected : optionsState[0]}
                loading={loading}
                onChange={onSelect}
                options={optionsState || []}
                getOptionLabel={option => option}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select the option..."
                    variant="outlined"
                    margin="dense"
                    FormHelperTextProps={{
                      margin: 'dense',
                      style: { marginLeft: 0 },
                    }}
                    InputProps={params.InputProps}
                  />
                )}
              />
              <FormHelperText>Select the desired option</FormHelperText>
            </FormControl>
          ):(
            <Box className={boxInfo}>
              ⚠️ No options available
            </Box>
        )}
        </>
      </>
    );
}


export function resolveUiSchema(uiSchema:OptionsPickerProps['uiSchema']) {
  const key = uiSchema['ui:options']?.key;
  const property = uiSchema['ui:options']?.property;
  return [key, property]
}