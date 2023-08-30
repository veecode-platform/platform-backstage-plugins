import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { useApi } from '@backstage/core-plugin-api';
import { gitlabPipelinesApiRef } from '../../api';
import { SelectBranch } from '../SelectBranch';
import { GitlabPipelinesProvider } from '../context/GitlabPipelinesProvider';

export const ExampleComponent = () => {

  const api = useApi(gitlabPipelinesApiRef);
  const projectSlug = 'ValberJunior/teste-lambda'

  useEffect(() => {
    const getBranches = async () => {
      const data = await api.listBranchesFromRepo(projectSlug);
      if (data) {
        console.log(data)
      }
    };
    getBranches();
  }, []);
  
  return (
  <GitlabPipelinesProvider>
    <Page themeId="tool">
    <Header title="Welcome to gitlab-pipelines!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <div>
            <SelectBranch/>
          </div>
          <InfoCard title="Information card">
            <Typography variant="body1">
              All content should be wrapped in a card like this.
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <ExampleFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
  </GitlabPipelinesProvider>
);}
