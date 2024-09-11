import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { MenuOptions } from './MenuOptions';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { AboutPage } from '../AboutPage';
import { PluginsList } from '../PluginsList';
import { KongServiceManagerProvider } from '../../context';
import {RoutesList} from '../RoutesList';
import { useHomepageStyles } from './styles';


export const KongServiceManagerHomepage = () => {

  const {content, divider} = useHomepageStyles();
  const navigate = useNavigate();

  // eslint-disable-next-line no-console
  console.warn(`
    The proxy will no longer be used for authentication and instance referencing, we have developed the backend plugin, 
    see the full documentation at 👉🏻 https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/kong-service-manager-backend/README.md
    After following the documentation, now use the KongServiceManagerContent component, see the frontend plugin  👉🏻 https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/kong-service-manager/README.md
  `);

  useEffect(()=>{
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
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </KongServiceManagerProvider>
  );
}