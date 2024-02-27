import { createContext } from "react";
import { ServiceInfoResponse } from "../../utils/types";


export type KongServiceManagerContextType = {
    allPluginsEnabled: string[] | null;
    listAllPluginsEnabled: () => Promise<void | never[]>;
    getServiceDetails: (serviceIdOrName: string, proxyPath?: string) => Promise<void | null>,
    serviceDetails: ServiceInfoResponse | null
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!)