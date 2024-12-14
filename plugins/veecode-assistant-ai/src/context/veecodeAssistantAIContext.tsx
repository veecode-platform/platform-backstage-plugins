import React from "react";
import { EntityAnnotationType } from "../utils/types";
import { EntityInfoActionType } from "./state";

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
    entityInfoDispatch: React.Dispatch<EntityInfoActionType>
}

export const VeeCodeAssistantAIContext = React.createContext<VeecodeAssistantAIContextType>(null!)