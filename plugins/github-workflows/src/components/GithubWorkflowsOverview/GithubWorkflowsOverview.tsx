import { Content, ContentHeader, Header, HeaderLabel,Page, SupportButton } from '@backstage/core-components'
import { Grid } from '@material-ui/core'
import React from 'react'
import { WorkflowList } from '../WorkflowList'
import { WorkFlowCard } from '../WorkFlowCard'

export const GithubWorkflowsOverview = () => {
  return (
    <Page themeId="tool">
    <Header title="Welcome to github-workflows!" subtitle="Platform Plugin">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Github-workflows">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <WorkflowList />
        </Grid>
        <Grid item lg={8}>
          <WorkFlowCard/>
        </Grid>
      </Grid>
    </Content>
  </Page>
  )
}