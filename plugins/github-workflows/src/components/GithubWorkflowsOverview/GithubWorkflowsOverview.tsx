import { Content, ContentHeader, Header, HeaderLabel,Page, SupportButton } from '@backstage/core-components'
import { Grid } from '@material-ui/core'
import React from 'react'
import { WorkflowTable } from '../WorkFlowTable'
import { GithubWorkflowsProvider } from '../context/GithubWorkflowsProvider'
import { WorkFlowCard } from '../WorkFlowCard';
import { useTranslationRef } from '@backstage/core-plugin-api/dist/alpha'
import { githubWorkflowsTranslationRef } from '../../translation'

export const GithubWorkflowsOverview = () => {

  const {t} = useTranslationRef(githubWorkflowsTranslationRef);

 return (
      <GithubWorkflowsProvider>
        <Page themeId="tool">
          <Header title={t('overview.title')} subtitle={t('overview.subtitle')}>
            <HeaderLabel label="Owner" value="Team X" />
            <HeaderLabel label="Lifecycle" value="Alpha" />
          </Header>
          <Content>
            <ContentHeader title="Github-workflows">
              <SupportButton>{t('overview.supportButton')}</SupportButton>
            </ContentHeader>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <WorkflowTable />
              </Grid>
              <Grid item lg={8}>
                <WorkFlowCard />
              </Grid>
            </Grid>
          </Content>
        </Page>
      </GithubWorkflowsProvider>
  )
}