/* eslint-disable @backstage/no-undeclared-imports */
import { useApi } from '@backstage/core-plugin-api';
import { scmIntegrationsApiRef,scmAuthApiRef} from '@backstage/integration-react';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { GithubRepoPicker } from './GithubRepoPicker';
import { GitlabRepoPicker } from './GitlabRepoPicker';
import { RepoUrlPickerHost } from './RepoUrlHost';
import { RepoUrlPickerRepoName } from './RepoUrlRepoName';
import { parseRepoPickerUrl, serializeRepoPickerUrl } from './utils';
import { RepoUrlSelectorProps } from './schema';
import { RepoUrlPickerState } from './types';
import useDebounce from 'react-use/lib/useDebounce';
import { useTemplateSecrets } from '@backstage/plugin-scaffolder-react';
import { BitbucketRepoPicker } from './BitbucketRepoPicker';
import { AzureRepoPicker } from './AzureRepoPicker';
import { GerritRepoPicker } from './GerritRepoPicker';
import { Box, Divider, Typography } from '@material-ui/core';

export { RepoUrlSelectorSchema } from './schema';

/**
 * The underlying component that is rendered in the form for the `RepoUrlPicker`
 * field extension.
 *
 * @public
 */
export const RepoUrlSelector = (props: RepoUrlSelectorProps) => {

  const { uiSchema, onChange, rawErrors, formData, schema, formContext } = props;
  const [state, setState] = useState<RepoUrlPickerState>(
    parseRepoPickerUrl(formData),
  );
  const integrationApi = useApi(scmIntegrationsApiRef);
  const scmAuthApi = useApi(scmAuthApiRef);
  const { setSecrets } = useTemplateSecrets();
  const allowedHosts = useMemo(
    () => uiSchema?.['ui:options']?.allowedHosts ?? [],
    [uiSchema],
  );
  const allowedOrganizations = useMemo(
    () => uiSchema?.['ui:options']?.allowedOrganizations ?? [],
    [uiSchema],
  );
  const allowedOwners = useMemo(
    () => uiSchema?.['ui:options']?.allowedOwners ?? [],
    [uiSchema],
  );
  const allowedProjects = useMemo(
    () => uiSchema?.['ui:options']?.allowedProjects ?? [],
    [uiSchema],
  );
  const allowedRepos = useMemo(
    () => uiSchema?.['ui:options']?.allowedRepos ?? [],
    [uiSchema],
  );

  const { owner, organization, project, repoName } = state;

  useEffect(() => {
    onChange(serializeRepoPickerUrl(state));
  }, [state, onChange]);

  /* we deal with calling the repo setting here instead of in each components for ease */
  useEffect(() => {
    if (allowedOrganizations.length > 0 && !organization) {
      setState(prevState => ({
        ...prevState,
        organization: allowedOrganizations[0],
      }));
    }
  }, [setState, allowedOrganizations, organization]);

  useEffect(() => {
    if (allowedOwners.length > 0 && !owner) {
      setState(prevState => ({
        ...prevState,
        owner: allowedOwners[0],
      }));
    }
  }, [setState, allowedOwners, owner]);

  useEffect(() => {
    if (allowedProjects.length > 0 && !project) {
      setState(prevState => ({
        ...prevState,
        project: allowedProjects[0],
      }));
    }
  }, [setState, allowedProjects, project]);

  useEffect(() => {
    if (allowedRepos.length > 0 && !repoName) {
      setState(prevState => ({ ...prevState, repoName: allowedRepos[0] }));
    }
  }, [setState, allowedRepos, repoName]);

  const updateLocalState = useCallback(
    (newState: RepoUrlPickerState) => {
      setState(prevState => ({ ...prevState, ...newState }));
    },
    [setState],
  );

  useDebounce(
    async () => {
      const { requestUserCredentials } = uiSchema?.['ui:options'] ?? {};

      if (
        !requestUserCredentials ||
        !(state.host && state.owner && state.repoName)
      ) {
        return;
      }

      const [encodedHost, encodedOwner, encodedRepoName] = [
        state.host,
        state.owner,
        state.repoName,
      ].map(encodeURIComponent);

      // user has requested that we use the users credentials
      // so lets grab them using the scmAuthApi and pass through
      // any additional scopes from the ui:options
      const { token } = await scmAuthApi.getCredentials({
        url: `https://${encodedHost}/${encodedOwner}/${encodedRepoName}`,
        additionalScope: {
          repoWrite: true,
          customScopes: requestUserCredentials.additionalScopes,
        },
      });

      // set the secret using the key provided in the the ui:options for use
      // in the templating the manifest with ${{ secrets[secretsKey] }}
      setSecrets({ [requestUserCredentials.secretsKey]: token });
    },
    500,
    [state, uiSchema],
  );

  const hostType =
    (state.host && integrationApi.byHost(state.host)?.type) ?? null;

  return (
    <>
      {schema.title && (
        <Box my={1}>
          <Typography variant="h5">{schema.title}</Typography>
          <Divider />
        </Box>
      )}
      {schema.description && (
        <Typography variant="body1">{schema.description}</Typography>
      )}
      <RepoUrlPickerHost
        host={state.host}
        hosts={allowedHosts}
        onChange={host => setState(prevState => ({ ...prevState, host }))}
        rawErrors={rawErrors}
      />
      {hostType?.includes('github') && (
        <GithubRepoPicker
          allowedOwners={allowedOwners}
          onChange={updateLocalState}
          rawErrors={rawErrors}
          state={state}
          hosts={allowedHosts}
        />
      )}
      {hostType?.includes('gitlab') && (
        <GitlabRepoPicker
          allowedOwners={allowedOwners}
          rawErrors={rawErrors}
          state={state}
          onChange={updateLocalState}
          hosts={allowedHosts}
        />
      )}
       {hostType === 'bitbucket' && (
        <BitbucketRepoPicker
          allowedOwners={allowedOwners}
          allowedProjects={allowedProjects}
          rawErrors={rawErrors}
          state={state}
          onChange={updateLocalState}
        />
      )}
      {hostType === 'azure' && (
        <AzureRepoPicker
          allowedOrganizations={allowedOrganizations}
          allowedOwners={allowedOwners}
          rawErrors={rawErrors}
          state={state}
          onChange={updateLocalState}
        />
      )}
      {hostType === 'gerrit' && (
        <GerritRepoPicker
          rawErrors={rawErrors}
          state={state}
          onChange={updateLocalState}
        />
      )}
      <RepoUrlPickerRepoName
        repoName={state.repoName}
        formContext={formContext}
        allowedRepos={allowedRepos}
        onChange={repo =>
          setState(prevState => ({ ...prevState, repoName: repo }))
        }
        rawErrors={rawErrors}
      />
    </>
  );
};
