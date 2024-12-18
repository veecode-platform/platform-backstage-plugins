import React from "react";
import { EntityAnnotationType } from "../utils/types";
import { EntityInfoActionType } from "./state";
import { FileContent, InitializeAssistantAIResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

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
    downloadRepoFiles: (location: string) => Promise<File[]>;
    submitRepoAndCreateVectorStore: (files:File[]) => Promise<void>;
    chat: (prompt: string) => Promise<InitializeAssistantAIResponse | null>;
    analyzeChangesAndSubmitToRepository:  (files: FileContent[]) => Promise<void | null>,
    clearHistory: () => Promise<void>
    
}

export const VeeCodeAssistantAIContext = React.createContext<VeecodeAssistantAIContextType>(null!)