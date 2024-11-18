import type { OpenAIProviderConfig } from "../utils/types";

export interface VeecodeAIConfig {
    getOpenAIConfig: () => OpenAIProviderConfig
}