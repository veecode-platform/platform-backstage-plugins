import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { Button, Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader
} from '@backstage/core-components';


interface Props {
  title: string,
  subtitle: string,
  refresh?: string,
  add: string,
  labelButton: string,
  children: JSX.Element
}
// TO DO >> Makestyles for button

export const PageDefault = ({ title, subtitle, refresh, add, labelButton, children }: Props) => (

  <Page themeId="tool">
    <Header title={title} subtitle={subtitle}> </Header>
    <Content>
      <ContentHeader title=''>
        <Grid item xs={12} >
          <Grid container justifyContent='center' alignItems='center'>
            {refresh && <Button component={RouterLink} to={refresh} style={{ margin: "5px", background: "#20a082", color: "#fff" }} variant='contained' size='large'>Refresh</Button>}
            <Button component={RouterLink} to={add} style={{ margin: "5px", background: "#20a082", color: "#fff" }} variant='contained' size='large'>{labelButton}</Button>
          </Grid>
        </Grid>
      </ContentHeader>
      <Grid container spacing={5} direction="column">
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Content>
  </Page>
);
