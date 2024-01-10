import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  CreateButton
} from '@backstage/core-components';

interface Props {
  title: string,
  subtitle: string,
  refresh?: string,
  add: string,
  labelButton: string,
  children: JSX.Element
}

export const PageDefault = ({ title, subtitle, refresh, add, labelButton, children }: Props) => (
<Page themeId="tool">
    <Header title={title} subtitle={subtitle}> </Header>
    <Content>
      <ContentHeader title=''>
        <div style={{display:'flex', gap:'.5rem'}}>
          <CreateButton
            title="Refresh"
            to={refresh}
          />
          <CreateButton
            title={labelButton}
            to={add}
          /> 
        </div>
      </ContentHeader>
      <Grid container spacing={5} direction="column">
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Content>
  </Page>
);
