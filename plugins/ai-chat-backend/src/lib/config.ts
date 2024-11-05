import type { Config } from '@backstage/config';
import type { IOpenAIConfig } from './types';
import type { LoggerService } from '@backstage/backend-plugin-api';
import { OpenAIProviderConfig } from '../utils/types';

export class OpenAIConfig implements IOpenAIConfig {
    constructor(
        private config: Config,
        private logger: LoggerService
    ){}

    getConfig() : OpenAIProviderConfig{
        const openAIConfig = this.config.get('openai');
        if(!openAIConfig) {
            this.logger.error("Not configuration found for openAI")
        }
        return openAIConfig as OpenAIProviderConfig;
    }
}