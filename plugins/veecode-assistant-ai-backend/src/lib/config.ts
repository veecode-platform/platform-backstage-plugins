import type { Config } from '@backstage/config';
import type { VeecodeAIConfig } from './types';
import type { LoggerService } from '@backstage/backend-plugin-api';
import { OpenAIProviderConfig } from '../utils/types';

export class VeecodeAssistantAIConfig implements VeecodeAIConfig {
    constructor(
        readonly config: Config,
        readonly logger: LoggerService
    ){}

    getOpenAIConfig() : OpenAIProviderConfig{
        const openAIConfig = this.config.get<OpenAIProviderConfig>('veecodeAssistantAI.openai');
        if(!openAIConfig) {
            this.logger.error("Not configuration found for openAI")
        }
        return openAIConfig;
    }
}