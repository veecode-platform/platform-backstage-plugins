import React from "react";
import { EntityAnnotationType } from "../utils/types";
import { EntityInfoActionType } from "./state";
import { CreatePluginParams, FileContent, IPlugin, PullRequestResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-vee-common";

export type VeeContextType = {
    vectorStoreId: string | null;
    setVectorStoreId: React.Dispatch<React.SetStateAction<string | null>>;
    assistantId: string | null;
    setAssistantId: React.Dispatch<React.SetStateAction<string | null>>,
    threadId: string | null;
    setThreadId: React.Dispatch<React.SetStateAction<string | null>>;
    showChat: boolean;
    handleChat: () => void;
    entityInfoState: EntityAnnotationType | null;
    entityInfoDispatch: React.Dispatch<EntityInfoActionType>;
    getFilesFromRepoAndCreateVectorStore: () => Promise<SubmitRepoResponse | null>;
    chat: (prompt: string) => Promise<{
        analysis: string;
        files: FileContent[];
    } | null>
    setPromptValue: React.Dispatch<React.SetStateAction<string | null>>;
    promptValue: string | null;
    analyzeChangesAndSubmitToRepository: (files: FileContent[]) => Promise<PullRequestResponse | null>;
    clearHistory: () => Promise<void>;
    listAllPlugins: () => Promise<IPlugin[]>;
    getPluginById: (id: string) => Promise<IPlugin | null>;
    addPlugin: (pluginData: CreatePluginParams) => Promise<void>;
    updatePlugin: (id: string, updateData: IPlugin) => Promise<void>;
    removePlugin: (pluginId: string) => Promise<void>;
    pluginSelectedState: IPlugin | null;
    addPluginSelected: (plugin: IPlugin) => void
}

export const VeeContext = React.createContext<VeeContextType>(null!)