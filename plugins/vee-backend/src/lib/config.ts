import type { Config } from '@backstage/config';
import type { IVeeConfig } from './types';
import type { LoggerService } from '@backstage/backend-plugin-api';
import { OpenAIProviderConfig } from '../utils/types';

export class VeeConfig implements IVeeConfig {
    constructor(
        protected config: Config,
        protected logger: LoggerService
    ){}

    getOpenAIConfig() : OpenAIProviderConfig{
        const openAIConfig = this.config.get<OpenAIProviderConfig>('vee.openai');
        if(!openAIConfig) {
            this.logger.error("Not configuration found for openAI")
        }
        return openAIConfig;
    }
}