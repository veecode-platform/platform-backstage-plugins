import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { MenuOptions } from './MenuOptions';
import { Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { KongServiceManagerProvider } from '../../context';
import { useHomepageStyles } from './styles';
import { SpecPluginsList } from '../SpecList/SpecPluginsList';
import { isKongManagerSpecAvailable } from '../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { kongRoutesReadPermission, kongServiceReadPermission, kongReadSpecsPermission } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import RoutePage  from '../RoutePage/RoutePage';
import ServicePage  from '../ServicePage/ServicePage';
import RoutesList from '../RoutesList/RoutesList';
import SpecList  from '../SpecList/SpecList';

export const KongServiceManagerHomepage = () => {

  const {content, divider} = useHomepageStyles();
  const { entity } = useEntity()
  const navigate = useNavigate();
  const specListAvailable = isKongManagerSpecAvailable(entity);

  React.useEffect(()=>{
   navigate('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <KongServiceManagerProvider>
      <Container maxWidth="xl">
        <Grid container spacing={4} className={content}>
          <Grid item lg={2} className={divider}>
            <MenuOptions isSpecAvailable={specListAvailable} />
          </Grid>
          <Grid item lg={10}>
            <Routes>
              <Route path="" element={
                 <RequirePermission permission={kongServiceReadPermission}>
                   <ServicePage />
                </RequirePermission>
              } />
              <Route path="all-routes/*" element={
                  <Routes>
                    <Route path="" element={
                      <RequirePermission permission={kongRoutesReadPermission}>
                      <RoutesList />
                      </RequirePermission>
                    }/>
                    <Route path="/:routeNameOrId" element={
                      <RequirePermission permission={kongRoutesReadPermission}>
                      <RoutePage/>
                      </RequirePermission>
                    }/>  
                  </Routes>
                } />
              <Route
                path="all-specs/*"
                element={
                  specListAvailable ? (
                    <RequirePermission permission={kongReadSpecsPermission}>
                      <Routes>
                        <Route path="" element={<SpecList />} />
                        <Route path=":specName" element={<SpecPluginsList />} />
                      </Routes>
                    </RequirePermission>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </KongServiceManagerProvider>
  );
}