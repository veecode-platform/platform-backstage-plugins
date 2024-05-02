/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Select, SelectItem } from '@backstage/core-components';
import { RepoUrlPickerState } from './types';
import { useScaffolder } from '../../hooks/useScaffolder';
import { Grid, Input, InputLabel } from '@material-ui/core';
import { ProviderService } from '../../services';

export const GitlabRepoPicker = (props: {
  allowedOwners?: string[];
  rawErrors: string[];
  state: RepoUrlPickerState;
  onChange: (state: RepoUrlPickerState) => void;
  hosts: string[]
}) => {
  const { allowedOwners = [], rawErrors, state, onChange , hosts} = props;
  const ownerItems: SelectItem[] | SelectItem  = allowedOwners
    ? allowedOwners.map(i => ({ label: i, value: i }))
    : [{ label: 'Loading...', value: 'loading' }];
  const { owner } = state;
  const [items, setItems] = useState<string[]>();
  const [ownerList, setOwnerList] = useState<SelectItem[]>();
  const { gitlabScaffolderExists, gitlabTokenScaffolder, gitlabHostScaffolder } = useScaffolder();
  const messageLoading = "loading ...";

  const itemsList = (data:string[]) : SelectItem[] => {
    if(data !== undefined){
      const owners:SelectItem[] = []
      data.forEach((item : string) =>{
         owners.push({
          label: item,
          value: item
        })
      })
      return owners;
    }
    return [{
      label: messageLoading,
      value: messageLoading
    }]
  }

  const fetchData= async () => {
    const getData = new ProviderService('gitlab',gitlabHostScaffolder,gitlabTokenScaffolder).getUserAndOrgs();
    try{
      const user = (await getData).username;
      const organizations = (await getData).organizations
      if(user !== "Not found")
      { const ownerDataResult = [user, ...organizations];
        setItems(ownerDataResult);
      } else {
        const ownerDataResult = ["Not Found"];
        setItems(ownerDataResult);
      }
    }catch(err:any){
      throw new Error(err)
    }
  }

  useEffect(()=>{
    if(!hosts?.includes('gitlab') || gitlabScaffolderExists){
      fetchData()
    }
},[]);


useEffect(()=>{
  if(items){
    const data = itemsList(items as string[]);
    setOwnerList( data !== undefined ? data : [{label: messageLoading, value: messageLoading}]);
    if(!owner){
      onChange({owner:items[0]})
    }
  }
},[items]);

  
  return (
    <>
      <FormControl
        margin="normal"
        required
        error={rawErrors?.length > 0 && !owner}
      >
        {
          gitlabScaffolderExists ? (
            <>
                {allowedOwners?.length ? (
                    <Select
                      native
                      label="Owner Available"
                      onChange={s =>
                        onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                      }
                      disabled={allowedOwners.length === 1}
                      selected={owner}
                      items={ownerItems as SelectItem[]}
                    />
                  ) : (
                    <>
                      <Grid item style={{marginBottom:'1rem'}}>
                        <Select        
                          native
                          label="Owner"
                          onChange={s =>
                            onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                          }
                          disabled={allowedOwners.length === 1}
                          selected={owner}
                          items={ownerList as SelectItem[]}
                        />
                      </Grid>
                    </>
                  )}
            </>
          ): (
            <>
             {allowedOwners?.length ? (
                  <Select
                    native
                    label="Owner Available"
                    onChange={selected =>
                      onChange({
                        owner: String(Array.isArray(selected) ? selected[0] : selected),
                      })
                    }
                    disabled={allowedOwners.length === 1}
                    selected={owner}
                    items={ownerItems as SelectItem[]}
                  />
                ) : (
                  <>
                    <InputLabel htmlFor="ownerInput">Owner</InputLabel>
                    <Input
                      id="ownerInput"
                      onChange={e => onChange({ owner: e.target.value })}
                      value={owner}
                    />
                  </>
                )}
            </>
          )

        }
        <FormHelperText>
          GitLab namespace where this repository will belong to. It can be the
          name of organization, group, subgroup, user, or the project.
        </FormHelperText>
      </FormControl>
    </>
  );
};
