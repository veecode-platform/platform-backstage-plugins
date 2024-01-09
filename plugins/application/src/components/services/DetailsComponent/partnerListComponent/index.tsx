import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';
import { Table, TableColumn, Progress} from '@backstage/core-components';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, Button} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { IPartner } from '../../utils/interfaces';
import { createAxiosInstance } from '../../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api';

type PartnerListProps = {
  partners: IPartner[];
  servicePartnerId: any[];
  serviceId: string;
  axiosInstance: any;
}

type ActionsGridProps = {
  partnerId: string;
  removeHandler: (partnerId: string) => void; 
  addHandler: (partnerId: string) => void; 
}


const ActionsGrid = ({removeHandler, addHandler, partnerId}:ActionsGridProps) =>{

  return(
    <div>
      <Tooltip title="Remove">
        <IconButton aria-label="remove" onClick={()=>{removeHandler(partnerId)}}>
          <RemoveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={()=>{addHandler(partnerId)}}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

const PartnersList = ({partners, servicePartnerId, serviceId, axiosInstance}:PartnerListProps) =>{

  const [partnerList, setPartnerList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const associated = servicePartnerId.map((partner) => {
      return partner.partner_id;
    });
    setPartnerList(associated as string[])

  }, [])

  const handleSubmit = async() =>{
    setLoading(true)
    const updateServicesPartners = {
      service:{
        partnersId: partnerList
      }
    } 
    await axiosInstance.patch(`/services/${serviceId}`, JSON.stringify(updateServicesPartners) )
    setLoading(false)  
  }

  const addHandler = (partnerId:string) => {
    if(partnerList.indexOf(partnerId) >= 0) return;
    const copy = partnerList
    copy.push(partnerId)
    setPartnerList([...copy])
  }
  
  const removeHandler = (partnerId:string) => {
    if(partnerList.indexOf(partnerId) === -1) return;
    let copy = partnerList
    copy = copy.filter(e => e !== partnerId)
    setPartnerList([...copy])
  }


    const columns: TableColumn[] = [
        { title: 'Id', field: 'id', width:'1fr' },
        { title: 'Name', field: 'name', width: '1fr' },
        { title: 'Email', field: 'email', width: '1fr' },
        { title: "Status", field: "status", width: '1fr'},
        { title: "Action", field: "action", width: '1fr'}
      ];
      // defaultGroupOrder: 1, organiza por grupos
    
      const data = partners.map(partner => {
        return {
          name: partner.name,
          email: partner.email,
          id: partner.id,
          status: partnerList.indexOf(partner.id) >=0 ? "Enabled" : "Disabled",
          action: <ActionsGrid partnerId={partner.id} removeHandler={removeHandler} addHandler={addHandler}/>,
          // listed: partnerList.indexOf(partner.id) >=0 ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>
        };
      });
    
      return (       
        <>
        <Table
          title={`Partners (${partners.length})`}
          options={{ search: true, paging: true }}
          columns={columns}
          data={data}
        />
        <Grid style={{margin: "2vw"}} item xs={12} >
          <Grid container justifyContent='center' alignItems='center' spacing={2}>
            <Grid item><Button component={RouterLink} to="/services" variant='contained' size='large'>Cancel</Button></Grid>
            <Grid item><Button disabled={partnerList === servicePartnerId || loading} onClick={()=>{handleSubmit()}} variant='contained' size='large'>{loading ? "Saving..." :"Save"}</Button></Grid>
          </Grid>           
        </Grid>
        </>
      );    
}

export const PartnerListComponent = ({servicePartnerId, serviceId}:any) => {
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})
  const { value, loading, error } = useAsync(async (): Promise<IPartner[]> => {
    const {data} = await axiosInstance.get(`/partners`)
    return data.partners;
  }, []);
  
  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
    return <PartnersList partners={value || []} servicePartnerId={servicePartnerId} serviceId={serviceId} axiosInstance={axiosInstance}/>;
  };