import { createContext } from "react";
import { ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    allPluginsEnabled: string[] | null;
    listAllPluginsEnabled: (proxyPath: string) => Promise<string[]>;
    getServiceDetails: (serviceIdOrName: string, proxyPath: string) => Promise<ServiceInfoResponse | null>,
    serviceDetails: ServiceInfoResponse | null
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>({
    allPluginsEnabled: null,
    listAllPluginsEnabled: async () => [],
    getServiceDetails: async () => null,
    serviceDetails: null

})