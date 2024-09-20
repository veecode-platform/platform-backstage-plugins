import { EntityProvider, EntityProviderConnection } from '@backstage/plugin-catalog-node';
import { CacheService, LoggerService, SchedulerServiceTaskRunner, AuthService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { InfracostProviderConfig, readProviderConfigs } from '../lib/config';
import * as uuid from 'uuid';
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
            const taskRunner = options.schedule ??
            options.scheduler!.createScheduledTaskRunner(providerConfig.schedule!) ;

            const provider = new InfracostEntityProvider({
                id: providerConfig.id,
                provider: providerConfig,
                logger: options.logger,
                cache: options.cache,
                auth: options.auth
            });

            if(taskRunner !== 'manual') provider.schedule(taskRunner);

            return provider
        })
    }

    constructor(
        private options: {
          id: string;
          provider: InfracostProviderConfig;
          logger: LoggerService;
          cache: CacheService;
          auth: AuthService;
        },
      ) {
        this.infracostService = new InfracostService()
      }

    getProviderName():string {
        return `InfracostEntityProvider: ${this.options.id}`
    }

    async connect(connection: EntityProviderConnection){
        this.connection = connection;
        await this.scheduleFn?.()
    }

    async read(options?:{logger?: LoggerService}){
      if (!this.connection) {
        throw new Error(`${this.getProviderName()}: Not initialized`);
      }
      const logger = options?.logger ?? this.options.logger;
      const baseUrl = this.options.provider.baseUrl;
      const { token } = await this.options.auth.getPluginRequestToken({
        onBehalfOf: await this.options.auth.getOwnServiceCredentials(),
        targetPluginId: 'infracost', 
      });
      const entities = await this.infracostService.getAllInfracostProjectsEstimate(`${baseUrl}/api/infracost`, token);

      const { markReadComplete } = trackProgress(logger);
      const { markProcessComplete } = markReadComplete({entities})

      markProcessComplete();
    }

    private schedule(taskRunner: SchedulerServiceTaskRunner) {
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
                await this.read({logger});
              } catch (error: any) {
                  logger.error('Error while syncing Infracost Entities', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    status: error.response?.status,
                  });
              }
            },
          });
        };
      }
    
}


function trackProgress(logger: LoggerService) {
  let timestamp = Date.now();
  let summary: string;

  logger.info('Reading Infracost Entities...');

  function markReadComplete(read: { entities: unknown[]; }) {
    summary = `${read.entities.length} Infracost Entities`;
    const readDuration = ((Date.now() - timestamp) / 1000).toFixed(1);
    timestamp = Date.now();
    logger.info(`Read ${summary} Infracost Entities in ${readDuration} seconds...`);
    return { markProcessComplete };
  }

  function markProcessComplete() {
    const commitDuration = ((Date.now() - timestamp) / 1000).toFixed(1);
    logger.info(`Processed ${summary} Infracost Projects Estimate in ${commitDuration} seconds.`);
  }

  return { markReadComplete };
}
