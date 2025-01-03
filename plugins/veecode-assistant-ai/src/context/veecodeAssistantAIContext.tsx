import React from "react";
import { EntityAnnotationType } from "../utils/types";
import { EntityInfoActionType } from "./state";
import { FileContent, InitializeAssistantAIResponse, PullRequestResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export type VeecodeAssistantAIContextType = {
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
    getFilesFromRepo: () => Promise<File[] | null>
    createVectorStore: (files: File[]) => Promise<void>;
    getFilesFromRepoAndCreateVectorStore: () => Promise<SubmitRepoResponse | null>;
    chat: (prompt: string) => Promise<InitializeAssistantAIResponse | null>;
    analyzeChangesAndSubmitToRepository: (files: FileContent[]) => Promise<PullRequestResponse | null>,
    clearHistory: () => Promise<void>
    
}

export const VeeCodeAssistantAIContext = React.createContext<VeecodeAssistantAIContextType>(null!)