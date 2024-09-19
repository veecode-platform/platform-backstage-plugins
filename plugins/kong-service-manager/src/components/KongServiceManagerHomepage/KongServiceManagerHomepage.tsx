import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { MenuOptions } from './MenuOptions';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { AboutPage } from '../AboutPage';
import { PluginsList } from '../PluginsList';
import { KongServiceManagerProvider } from '../../context';
import {RoutesList} from '../RoutesList';
import { useHomepageStyles } from './styles';
import { SpecList } from '../SpecList';
import { SpecPluginsList } from '../SpecList/SpecPluginsList';
import { PullRequest } from '../SpecList/PullRequest';


export const KongServiceManagerHomepage = () => {

  const {content, divider} = useHomepageStyles();
  const navigate = useNavigate();

  React.useEffect(()=>{
   navigate('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <KongServiceManagerProvider>
      <Container maxWidth="xl">
        <Grid container spacing={4} className={content}>
          <Grid item lg={2} className={divider}>
            <MenuOptions />
          </Grid>
          <Grid item lg={10}>
            <Routes>
              <Route path="" element={<AboutPage />} />
              <Route path="all-routes" element={<RoutesList />} />
              <Route path="all-plugins" element={<PluginsList />} />
              <Route path="all-specs" element={<SpecList/>}/>
              <Route path="all-specs/:specName" element={<SpecPluginsList/>}/>
              <Route path="all-specs/:specName/create-pull-request" element={<PullRequest/>} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </KongServiceManagerProvider>
  );
}