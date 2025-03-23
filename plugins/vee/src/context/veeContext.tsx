import React from "react";
import { EntityAnnotationType, InstructionsProps, TemplateOutputProps } from "../utils/types";
import { EntityInfoActionType, InstructionsActionType } from "./state";
import { CreateFixedOptionsParams, CreatePluginParams, CreateStackParams, FileContent, IFixedOptions, IPlugin, IStack, PullRequestResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-vee-common";

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
    getTemplateFilesAndCreateVectorStore: (source: string, templateName: string, engine?: string) => Promise<{projectStructure:string,vectorStoreId: string}>;
    templateChat: (templateName: string, prompt: string, projectStructureValue:string, vectorStoreIdValue: string, engine?: string) => Promise<{title: string; analysis: string; files: FileContent[]} | null>;
    templateOutputState: TemplateOutputProps | null;
    clearTemplateHistory: (engine?: string) => Promise<void>;
    allStacksState: IStack[];
    stackSelectedState: IStack | null;
    listAllStacks: () => Promise<IStack[]>;
    getStackById: (id: string) => Promise<IStack | null>;
    createStack: (stackData: CreateStackParams) => Promise<void>;
    updateStack: (id: string, updateData: IStack) => Promise<void>;
    removeStack: (stackId: string) => Promise<void>;
    addStackSelected: (stack: IStack) => void;
    allPluginsState: IPlugin[];
    listAllPlugins: () => Promise<IPlugin[]>;
    getPluginById: (id: string) => Promise<IPlugin | null>;
    addPlugin: (pluginData: CreatePluginParams) => Promise<void>;
    updatePlugin: (id: string, updateData: IPlugin) => Promise<void>;
    removePlugin: (pluginId: string) => Promise<void>;
    pluginSelectedState: IPlugin | null;
    addPluginSelected: (plugin: IPlugin) => void;
    instructionsState: InstructionsProps;
    instructionsDispatch: React.Dispatch<InstructionsActionType>;
    listAllFixedOptions: () => Promise<IFixedOptions[]>;
    getFixedOptionById: (id: string) => Promise<IFixedOptions | null>;
    createFixedOption: (fixedOptionData: CreateFixedOptionsParams) => Promise<void>;
    updateFixedOption: (id: string, updateData: IFixedOptions) => Promise<void>;
    removeFixedOption: (fixedOptionId: string) => Promise<void>,
    addFixedOptionSelected: (fixedOption: IFixedOptions) => void,
    allFixedOptionsState : IFixedOptions[],
    fixedOptionSelectedState: IFixedOptions | null;
}

export const VeeContext = React.createContext<VeeContextType>(null!)