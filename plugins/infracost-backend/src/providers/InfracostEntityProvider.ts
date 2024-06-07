/* eslint-disable @backstage/no-undeclared-imports */
import { EntityProvider, EntityProviderConnection } from '@backstage/plugin-catalog-node';
import { TaskRunner } from '@backstage/backend-tasks';
import { CacheService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { InfracostProviderConfig, readProviderConfigs } from '../lib/config';
import * as uuid from 'uuid';
import { Logger } from 'winston';
import { InfracostService } from '../service/InfracostService';
import { InfracostEntityProviderOptions } from './types';

export class InfracostEntityProvider implements EntityProvider {
    private connection?: EntityProviderConnection;
    private scheduleFn?: () => Promise<void>;
    private readonly infracostService: InfracostService;

    static fromConfig(
        configRoot: Config,
        options: InfracostEntityProviderOptions
    ):InfracostEntityProvider[]{
        return readProviderConfigs(configRoot).map( providerConfig => {
            const taskRunner =
            options.schedule ??
            options.scheduler!.createScheduledTaskRunner(providerConfig.schedule!) ;

            const provider = new InfracostEntityProvider({
                id: providerConfig.id,
                provider: providerConfig,
                logger: options.logger,
                cache: options.cache
            });

            if(taskRunner !== 'manual') provider.schedule(taskRunner);

            return provider
        })
    }

    constructor(
        private options: {
          id: string;
          provider: InfracostProviderConfig;
          logger: Logger;
          cache: CacheService;
        },
      ) {
        this.infracostService = new InfracostService()
      }

    getProviderName():string {
        return `InfracostEntityProvider:${this.options.id}`
    }

    async connect(connection: EntityProviderConnection){
        this.connection = connection;
        await this.scheduleFn?.()
    }

    async refresh(logger:Logger){
      if(!this.connection){
        logger.error(`${this.getProviderName()}: Error trying to initialize Provider`);
        return
      }
      const baseUrl = this.options.provider.baseUrl;
      await this.infracostService.getAllInfracostProjectsEstimate(baseUrl);
    }

    private schedule(taskRunner: TaskRunner) {
        this.scheduleFn = async () => {
          const id = `${this.getProviderName()}:refresh`;
          await taskRunner.run({
            id,
            fn: async () => {
              const logger = this.options.logger.child({
                class: InfracostEntityProvider.prototype.constructor.name,
                taskId: id,
                taskInstanceId: uuid.v4(),
              });
              try {
                await this.refresh(logger);
              } catch (error) {
                logger.error(error);
              }
            },
          });
        };
      }
    
}

  