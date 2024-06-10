/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { useEffect, useState } from 'react';
import { OptionsPickerProps } from "./schema";
import { Box, Divider, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { Select, SelectItem } from '@backstage/core-components';

export { OptionsPickerSchema } from './schema';

export type Annotations ={
  [key: string]: string | string [] | number | boolean;
} 

export const OptionsPicker = (props: OptionsPickerProps) => {

    const {uiSchema,schema /* onChange,formData,required,rawErrors,idSchema,*/} = props;
    const [items, setItems] = useState<SelectItem[]>([]);
    const { descriptionContent } = useStyles();

    const [ key, subKey] = resolveUiSchema(uiSchema)

    useEffect(()=>{
      if(key && subKey){
           // eslint-disable-next-line no-console
           const options = props.formContext.formData[key][subKey] as string[]
           options.map(option => setItems(prevState => [...prevState, {label:option, value:option}]))
       }
    },[])

    return (
      <>
        <Box my={1}>
          <Typography variant="h5">
            {schema.title ?? 'Reusing resources'}
          </Typography>
          <Divider />
        </Box>
        <Box className={descriptionContent}>
          <Typography variant="body1">
            {schema.description ??
              'Reuse resources from your catalog of entities'}
          </Typography>
        </Box>
        <Select
          onChange={() => {}}
          placeholder=""
            label=""
          items={items}
          />
      </>
    );
}


export function resolveUiSchema(uiSchema:OptionsPickerProps['uiSchema']) {
  const key = uiSchema['ui:options']?.key;
  const subKey = uiSchema['ui:options']?.subKey;
  return [key, subKey]
}