/* eslint-disable @backstage/no-undeclared-imports */
import { PluginTaskScheduler, TaskRunner } from '@backstage/backend-tasks';
import { PluginDatabaseManager } from '@backstage/backend-common';
import { CacheService, LoggerService } from '@backstage/backend-plugin-api';

export interface InfracostEntityProviderOptions {
    /**
     * A unique, stable identifier for this provider.
     *
     */
    id: string;
    /**
     * The refresh schedule to use.
     *
     * @defaultValue "manual"
     * @remarks
     *
     * If you pass in 'manual', you are responsible for calling the `read` method
     * manually at some interval.
     *
     * But more commonly you will pass in the result of
     * {@link @backstage/backend-tasks#PluginTaskScheduler.createScheduledTaskRunner}
     * to enable automatic scheduling of tasks.
     */
    schedule?: 'manual' | TaskRunner;
    /**
     * Scheduler used to schedule refreshes based on
     * the schedule config.
     */
    scheduler?: PluginTaskScheduler;
    /**
     * The logger to use.
     */
    logger: LoggerService;
    cache: CacheService;
    /**
     * The PluginDatabaseManager to use
     */
    database: PluginDatabaseManager;
  }
  