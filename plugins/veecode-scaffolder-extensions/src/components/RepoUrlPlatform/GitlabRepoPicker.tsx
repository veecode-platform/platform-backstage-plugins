/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Select, SelectItem } from '@backstage/core-components';
import { RepoUrlPickerState } from './types';
import { useScaffolder } from '../../hooks/useScaffolder';
import { Grid, Input, InputLabel } from '@material-ui/core';
import { getUserAndOrgs } from '../../services';

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
  const [ownerData, setOwnerData ] = useState<string>("loading ...");
  const [items, setItems] = useState<string[]>();
  const [hasIntegration, setHasIntegration] = useState<boolean>(false);
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

  useEffect(()=>{
    async function fetchData(){
      const params = {provider: 'gitlab', host: gitlabHostScaffolder ,token: gitlabTokenScaffolder};
      const getData = getUserAndOrgs(params);
      try{
        const user = (await getData).username;
        const organizations = (await getData).organizations
        if(user !== "Not found")
        { const ownerDataResult = [user, ...organizations];
          setOwnerData(user);
          setItems(ownerDataResult);
          setHasIntegration(true)
        } else {
          const ownerDataResult = ["Not Found"];
          setOwnerData("Not Found");
          setItems(ownerDataResult);
          setHasIntegration(false)
        }
      }catch(err:any){
        throw new Error(err)
      }
    }
    if(!hosts?.includes('gitlab') || gitlabScaffolderExists){
      fetchData()
    }
},[]);


useEffect(()=>{
  const data = itemsList(items as string[]);
  setOwnerList( data !== undefined ? data : [{label: messageLoading, value: messageLoading}]);
},[items]);

useEffect(()=>{
  onChange({ owner: ownerData as string })
},[ownerData])
  
  return (
    <>
      <FormControl
        margin="normal"
        required
        error={rawErrors?.length > 0 && !ownerData}
      >
        {
          hasIntegration ? (
            <>
                          {allowedOwners?.length ? (
              <Select
                native
                label="Owner Available"
                onChange={s =>
                  onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                }
                disabled={allowedOwners.length === 1}
                selected={owner??""}
                items={ownerItems}
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
                    selected={ownerData}
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
                    items={ownerItems}
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
