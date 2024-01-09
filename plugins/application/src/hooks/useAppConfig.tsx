import { configApiRef, useApi } from "@backstage/core-plugin-api";

export function useAppConfig() {
    const config = useApi(configApiRef);
    const BackendBaseUrl = `${config.getConfig('backend').get('baseUrl')}/api/devportal`
    return {
        config,
        BackendBaseUrl
    };
}
