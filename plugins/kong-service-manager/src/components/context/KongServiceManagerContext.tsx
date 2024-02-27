import { createContext } from "react";


export type KongServiceManagerContextType = {
    allPluginsEnabled: string[] | null;
    listAllPluginsEnabled: () => Promise<void | never[]>
};

export const KongServiceManagerContext = createContext<KongServiceManagerContextType>(null!)