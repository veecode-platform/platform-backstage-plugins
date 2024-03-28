import { configApiRef, useApi } from "@backstage/core-plugin-api";

export function useScaffolder() {
    const config = useApi(configApiRef);
    const scaffolder = config.getOptionalConfig('scaffolder');
    if(!scaffolder) return {};

    // gitlab
    const gitlabScaffolderExists = scaffolder.has('gitlab');
    const gitlabScaffolder = (scaffolder.getOptional('gitlab') || []) as any[];
    const gitlabHostScaffolder = gitlabScaffolder[0]?.host;
    const gitlabTokenScaffolder = gitlabScaffolder[0]?.token;
    
    // github
    const githubScaffolderExists = scaffolder.has('github');
    const githubScaffolder = (scaffolder.getOptional('github') || []) as any[];
    const githubHostScaffolder = githubScaffolder[0]?.host;
    const githubTokenScaffolder = githubScaffolder[0]?.token;

    return {
        gitlabScaffolderExists,
        gitlabHostScaffolder,
        gitlabTokenScaffolder,
        githubScaffolderExists,
        githubHostScaffolder,
        githubTokenScaffolder,
    };
}
