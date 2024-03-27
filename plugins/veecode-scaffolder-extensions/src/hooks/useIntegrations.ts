import { configApiRef, useApi } from "@backstage/core-plugin-api";

export function useIntegrations() {
    const config = useApi(configApiRef);
    const integrations = config.getOptionalConfig('integrations');
    if(!integrations) return {};

    // gitlab
    const gitlabIntegrationsExists = integrations.has('gitlab');
    const gitlabIntegrations = (integrations.getOptional('gitlab') || []) as any[];
    const gitlabHostIntegration = gitlabIntegrations[0]?.host;
    const gitlabTokenIntegration = gitlabIntegrations[0]?.tokenFrontEnd;
    
    // github
    const githubIntegrationsExists = integrations.has('github');
    const githubIntegrations = (integrations.getOptional('github') || []) as any[];
    const githubHostIntegration = githubIntegrations[0]?.host;
    const githubTokenIntegration = githubIntegrations[0]?.tokenFrontEnd;

    return {
        gitlabIntegrationsExists,
        gitlabHostIntegration,
        gitlabTokenIntegration,
        githubIntegrationsExists,
        githubHostIntegration,
        githubTokenIntegration,
    };
}
