import { configApiRef, useApi } from "@backstage/core-plugin-api";

export function useConfig(engine:string) {
    const config = useApi(configApiRef);
    const veeConfig = config.getOptionalConfig("vee");
    const catalogLocation = veeConfig?.getConfig(engine).getConfig('templateGeneration').get('catalog') ?? null;

    return {
        catalogLocation
    };
}