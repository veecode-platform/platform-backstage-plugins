import { Content, ContentHeader, Header, HeaderLabel,Page, SupportButton } from '@backstage/core-components'
import { Grid } from '@material-ui/core'
import React from 'react'
import { GitlabPipelinesProvider } from '../context/GitlabPipelinesProvider'
import { PipelinesTable } from '../GitlabPipelinesList/PipelinesTable'
import { GitlabJobs } from '../GitlabJobs'

export const GitlabPipelinesOverview = () => {

 return (
      <GitlabPipelinesProvider>
        <Page themeId="tool">
          <Header title="Welcome to gitlab-pipelines!" subtitle="Platform Plugin">
            <HeaderLabel label="Owner" value="Team X" />
            <HeaderLabel label="Lifecycle" value="Alpha" />
          </Header>
          <Content>
            <ContentHeader title="Gitlab-pipelines">
              <SupportButton>A description of your plugin goes here.</SupportButton>
            </ContentHeader>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <PipelinesTable/>
              </Grid>
              <Grid item lg={10}>
                <GitlabJobs/>
              </Grid>
            </Grid>
          </Content>
        </Page>
      </GitlabPipelinesProvider>
  )
}