import React, { useState } from 'react';
import { FetchListComponent } from '../FetchListComponent';
import { PageDefault } from '../../shared';
import useAsync from 'react-use/lib/useAsync';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';

import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api'; 

export const ApplicationListComponent = () => {
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})
  const [offset, setOffset] = useState(0)
  const [control, setControl] = useState(0)
  const [dataApplications, setDataApplications] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);


  const limit = 10
  const totalPages = Math.ceil(total/limit)

  const handleNextPage = () => {
    if(currentPage === totalPages-1) return;
    setCurrentPage(currentPage => { return currentPage+=1})
    setControl(control => {return control+=limit})
    if(offset === totalPages-1) return;
    setOffset(offset => {return offset+=limit})
  }

  const handlePreviousPage = () => {
    if(currentPage === 0) return;
    setCurrentPage(currentPage => { return currentPage-=1})
    setControl(control => {return control-=limit})
  }

  const handleFirstPage = () => {
    if(currentPage === 0) return;
    setCurrentPage(0)
    setControl(0)
  }
  const handleLastPage = () => {
   return ;
  }
  const {loading, error } = useAsync(async (): Promise<void> => {
    const {data} = await axiosInstance.get(`/applications?limit=${limit}&offset=${offset}`)
    setDataApplications((dataApplications: any) => {return [...dataApplications, ...data.applications]})
    if(total === 0) setTotal(data.total)
    return ;
  },[offset]);

  return(
    <PageDefault
    title="Application for Partners"
    subtitle="Create and Manage Applications"
    add="new-application"
    labelButton="CREATE APPLICATION"
    refresh='/applications'
    >
    <div>
      <FetchListComponent data={dataApplications.slice(control, control+limit)} loading={loading} error={error} total={total}/>
      {!loading && <div style={{display: "flex", padding:"1vh", justifyContent:"flex-end", color:"#e7e7e7"}}>
        <div style={{display: "flex", gap:"0.5vw", alignItems:"center"}}>

          <Tooltip title="First Page" placement="bottom">
            <IconButton onClick={()=>{handleFirstPage()}}>
              <FirstPage />
            </IconButton>
          </Tooltip>

          <Tooltip title="Previous Page" placement="bottom">
            <IconButton onClick={()=>{handlePreviousPage()}}>
              <ChevronLeft />
            </IconButton>
          </Tooltip>

          <div>Page {currentPage+1}-{totalPages}</div>
          
          <Tooltip title="Next Page" placement="bottom">
            <IconButton onClick={()=>{handleNextPage()}}>
              <ChevronRight />
            </IconButton>
          </Tooltip>

          <Tooltip title="Last Page" placement="bottom">
            <IconButton onClick={()=>{handleLastPage()}}>
              <LastPage />
            </IconButton>
          </Tooltip>
        </div>
      </div>}
    </div>

    </PageDefault>
)};
