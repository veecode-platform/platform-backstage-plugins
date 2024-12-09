import React, { useCallback, useEffect, useState } from 'react';
import { ResourcePickerProps } from "./schema";
import { Box, Button, Divider, FormControl, FormHelperText, TextField, Typography } from '@material-ui/core';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Link as RouterLink } from 'react-router-dom';
import { Autocomplete, AutocompleteChangeReason } from '@material-ui/lab';
import useAsync from 'react-use/esm/useAsync';
import { useStyles } from './styles';
import { SkeletonComponent } from './skeletonComponent';

export { ResourcePickerSchema } from './schema';

export type Annotations ={
  [key: string]: string | string [] | number | boolean;
} 

export type EntityResourceProps = {
  name: string;
  type: string;
  lifecycle: string;
  [key:string]: Object
}

export const ResourcePicker = (props: ResourcePickerProps) => {

    const {uiSchema,schema,onChange,formData,required,rawErrors,idSchema,} = props;
    const [catalogFilter,type] = resolveCatalogFilter(uiSchema);
    const catalogApi = useApi(catalogApiRef);
    const [entities, setEntities] = useState<EntityResourceProps[]>([]);
    const [entitySelected, setEntitySelected] = useState<EntityResourceProps|null>(null);
    const { autocompleteWrapper,descriptionContent,boxInfo } = useStyles();
  
    const { loading } = useAsync(async () => {
      const { items } = await catalogApi.getEntities(
        catalogFilter ? { filter: catalogFilter as any } : {filter: ''},
      );
      if (type) {
        const entityData = items.filter(
          item => item.spec && item.spec.type === type,
        );
        const updateEntities = entityData.map(i => {
          if (i.metadata.environment) {
            return {
              name: i.metadata.name,
              type: i.spec!.type as string,
              lifecycle: i.spec!.lifecycle as string,
              ...(i.metadata.environment as Object),
            };
          }
          return { name: i.metadata.name, type: i.spec!.type as string, lifecycle: i.spec!.lifecycle as string };
        });
        setEntities(prevState => [...prevState, ...updateEntities]);
      }
      else {
        const updateEntities = items.map(i => {
          if (i.metadata.environment) {
            return {
              name: i.metadata.name,
              type: i.spec!.type as string,
              lifecycle: i.spec!.lifecycle as string,
              ...(i.metadata.environment as Object),
            };
          }
          return { name: i.metadata.name, type: i.spec!.type as string, lifecycle: i.spec!.lifecycle as string};
        });
        setEntities(prevState => [...prevState, ...updateEntities]);
      }
    },[]);

    const onSelect = useCallback(
      (_: any, ref: object | null, reason: AutocompleteChangeReason) => {
        if (typeof ref !== 'string' && ref) {
          onChange(ref);
        } else {
          if (reason === 'blur' || reason === 'create-option') {
            let entityRef = ref;
            try {
              entityRef = JSON.parse(entityRef! as string)
            } catch (err) {
              // If the passed in value isn't an entity ref, do nothing.
            }
            if (formData !== ref) {
              onChange(JSON.parse(entityRef! as string));
            }
          }
        }
      },
      [onChange, formData]
    );


  useEffect(() => {
    if (entities?.length === 1) {
      onChange((entities[0]));
    }
    if(!formData){
      onChange(entities[0])
      setEntitySelected(entities[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities]);

  useEffect(()=>{
    if(formData){
      setEntitySelected(formData as EntityResourceProps)
    }
  },[onChange,formData])
  
   if(loading) return (
     <SkeletonComponent 
       title={schema.title ?? 'Reusing resources'} 
       description={schema.description ?? 'Reuse resources from your catalog of entities'} 
      />
    )

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
        {entities && entities.length > 0 ? (
          <FormControl
            margin="normal"
            required={required}
            error={rawErrors?.length > 0 && !formData}
          >
            <Autocomplete
                disabled={entities?.length === 1}
                className={autocompleteWrapper}
                id={idSchema?.$id}
                value={entitySelected ? entitySelected : entities[0]}
                loading={loading}
                onChange={onSelect}
                options={entities || []}           
                getOptionLabel={(option) => option.name}
                renderInput={(params) => 
                  (<TextField 
                  {...params} 
                  label="Select the resource..." 
                  variant="outlined"
                  margin="dense"
                  FormHelperTextProps={{ margin: 'dense', style: { marginLeft: 0 } }}
                  InputProps={params.InputProps}
                    />)
                  }
              />
            <FormHelperText>Select the desired resource</FormHelperText>
          </FormControl>
        ) : (
          <Box className={boxInfo}>
            ⚠️ No resources available
            <Button
              component={RouterLink}
              to="/create"
              style={{ margin: '16px' }}
              size="large"
              variant="outlined"
            >
              Register Resource
            </Button>
          </Box>
      )}
      </>
    );
}

export function resolveCatalogFilter(uiSchema:ResourcePickerProps['uiSchema']) {
    const type = uiSchema['ui:options']?.catalogFilter?.type;   
    const catalogFilter = {kind: uiSchema['ui:options']?.catalogFilter?.kind, 'metadata.name': uiSchema['ui:options']?.catalogFilter?.allowedResources};
    return [catalogFilter, type]
}