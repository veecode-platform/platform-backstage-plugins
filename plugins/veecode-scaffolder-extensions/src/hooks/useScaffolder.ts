import { configApiRef, useApi } from "@backstage/core-plugin-api";

export function useScaffolder() {
    const config = useApi(configApiRef);
    const scaffolder = config.getOptionalConfig('scaffolder.providers');
    if(!scaffolder) return {};
    const gitlabScaffolder = (scaffolder.getOptional('gitlab') || []) as any[];
    const githubScaffolder = (scaffolder.getOptional('github') || []) as any[];

    return {
        gitlabScaffolderExists : scaffolder.has('gitlab'),
        gitlabHostScaffolder: gitlabScaffolder[0]?.host,
        gitlabTokenScaffolder: gitlabScaffolder[0]?.token,
        githubScaffolderExists: scaffolder.has('github'),
        githubHostScaffolder: githubScaffolder[0]?.host,
        githubTokenScaffolder:  githubScaffolder[0]?.token,
    };
}
