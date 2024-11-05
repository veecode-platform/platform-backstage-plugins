import { OpenAIProviderConfig } from "../utils/types";

export interface IOpenAIConfig {
    getConfig: () => OpenAIProviderConfig
}