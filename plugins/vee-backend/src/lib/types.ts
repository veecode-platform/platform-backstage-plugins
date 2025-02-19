import type { OpenAIProviderConfig } from "../utils/types";

export interface IVeeConfig {
    getOpenAIConfig: () => OpenAIProviderConfig
}