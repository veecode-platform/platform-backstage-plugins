import { PluginDatabaseManager } from '@backstage/backend-common';
import { ConsumerGroup } from '../../kong/model/ConsumerGroup';
import { AclPlugin } from '../../kong/plugins/AclPlugin';
import { KeyAuthPlugin } from '../../kong/plugins/KeyAuthPlugin';
import { Oauth2Plugin } from '../../kong/plugins/Oauth2Plugin';
import { RateLimitingPlugin } from '../../kong/plugins/RateLimitingPlugin';
import { ConsumerGroupService } from '../../kong/services/ConsumerGroupService';
import { SECURITY } from '../domain/Service';
import { ServiceDto } from '../dtos/ServiceDto';
import { PostgresServiceRepository } from '../repositories/Knex/KnexServiceReppository';
import { PostgresPluginRepository } from '../../plugins/repositories/Knex/KnexPluginRepository';
import { ApiManagmentError } from '../../utils/ApiManagmentError';

/** @public */
export interface RouterOptions {
  database: PluginDatabaseManager;
}
export class ControllPlugin {
  private static _instance: ControllPlugin;

  public constructor() { }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async applySecurityType(service: ServiceDto) {
    try {
      const consumerGroupService = new ConsumerGroupService();
      const plugins = []

      const consumerGroup: ConsumerGroup = new ConsumerGroup(`${service.kongServiceName}-group`);
      await consumerGroupService.createConsumerGroup(consumerGroup);

      if (service.securityType?.toString() === SECURITY.OAUTH2.toString()) {
        const oauth2 = await Oauth2Plugin.Instance.configureOauth(service.kongServiceName);
        plugins.push({ name: "oauth2", id: oauth2.id })
      }
      if (service.securityType?.toString() === SECURITY.KEY_AUTH.toString()) {
        const keyauth = await KeyAuthPlugin.Instance.configKeyAuthKongService(service.kongServiceName);
        plugins.push({ name: "key-auth", id: keyauth.id })
      }
      if (plugins.length > 0) {
        const acl = await AclPlugin.Instance.configAclKongService(service.kongServiceName, [`${service.kongServiceName}-group`]);
        plugins.push({ name: "acl", id: acl.id })
      }

      if (service.rateLimiting.value !== "0") {
        const rateLimiting = await RateLimitingPlugin.Instance.configRateLimitingKongService(service.kongServiceName, service.rateLimiting.type, service.rateLimiting.value, service.rateLimiting.limitBy)
        plugins.push({ name: "rateLimiting", id: rateLimiting.id })
      }

      return plugins

    } catch (error: any) {
      throw new ApiManagmentError(error.message, "Cannot create kong service", 1)
    }
  }

  public async updateServicePlugins(serviceId: string, serviceDto: any, routerOptions: RouterOptions) {
    try {
      const pluginRepository = await PostgresPluginRepository.create(await routerOptions.database.getClient());
      const serviceRepository = await PostgresServiceRepository.create(await routerOptions.database.getClient());
      const service = await serviceRepository.getServiceById(serviceId)

      const plugins = await pluginRepository.getPluginByServiceId(serviceId)

      if (plugins.length > 0) {
            await Promise.all(plugins.map(async p => {
            await AclPlugin.Instance.removePluginKongService(service.kongServiceName as string, p.kongPluginId);
            await pluginRepository.deletePlugin(p.id)
          }))
      }

      if (serviceDto.rateLimiting.value !== '0') {
        const rateLimiting = await RateLimitingPlugin.Instance.configRateLimitingKongService(service.kongServiceName as string, serviceDto.rateLimiting.type, serviceDto.rateLimiting.value, serviceDto.rateLimiting.limitBy)
        await pluginRepository.createPlugin({
          name: "rateLimiting",
          kongPluginId: rateLimiting.id,
          service: serviceId
        })
      }

      if (serviceDto.securityType !== "none") {
        const aclId = await AclPlugin.Instance.configAclKongService(service.kongServiceName as string, [`${service.kongServiceName}-group`]);
        await pluginRepository.createPlugin({
          name: "acl",
          kongPluginId: aclId.id,
          service: serviceId
        })

        if (serviceDto.securityType === SECURITY.OAUTH2.toString()) {
          const oauth2 = await Oauth2Plugin.Instance.configureOauth(service.kongServiceName as string);
          await pluginRepository.createPlugin({
            name: "oauth2",
            kongPluginId: oauth2.id,
            service: serviceId
          })
        }
        else {
          const keyauth = await KeyAuthPlugin.Instance.configKeyAuthKongService(service.kongServiceName as string);
          await pluginRepository.createPlugin({
            name: "key-auth",
            kongPluginId: keyauth.id,
            service: serviceId
          })
        }
      }

      return serviceRepository.patchService(serviceId, {
        rateLimiting: parseInt(serviceDto.rateLimiting.value as string, 10),
        rateLimitingType: serviceDto.rateLimiting.type,
        rateLimitingBy: serviceDto.rateLimiting.limitBy,
        securityType: serviceDto.securityType,
        name: serviceDto.name,
        active: serviceDto.active,
        description: serviceDto.description
      })

    }
    catch (error: any) {
      throw new ApiManagmentError(error.message, `Impossible to update plugin from service ${serviceId}`, 3)
    }

  }

  public async deleteService(serviceId: string, routerOptions: RouterOptions) {
    try {
      const pluginRepository = await PostgresPluginRepository.create(await routerOptions.database.getClient());
      const serviceRepository = await PostgresServiceRepository.create(await routerOptions.database.getClient());

      const service = await serviceRepository.getServiceById(serviceId)
      const plugins = await pluginRepository.getPluginByServiceId(serviceId)

      const consumerGroupService = new ConsumerGroupService();
      await consumerGroupService.deleteConsumerGroup(`${service.kongServiceName}-group`)

      if (plugins.length > 0) {
        plugins.forEach(async p => {
          await AclPlugin.Instance.removePluginKongService(service.kongServiceName as string, p.kongPluginId);
          await pluginRepository.deletePlugin(p.id)
        });
      }

      return plugins
    }
    catch (error: any) {
      throw new ApiManagmentError(error.message, `Impossible to delete plugins from service ${serviceId}`, 4)

    }
  }

  /* public async changeToOauth2(routerOptions: RouterOptions, serviceId: string) {
    const ServiceRepository = await PostgresServiceRepository.create(
      await routerOptions.database.getClient(),
    );
    let service = await ServiceRepository.getServiceById(serviceId);
    service = Object.values(service)[0];

    service.securityType = SECURITY.OAUTH2;

    Oauth2Plugin.Instance.configureOauth(service.kongServiceName as string);
    ServiceRepository.updateService(serviceId, service as ServiceDto);
  }

  public async changeStatus(
    routerOptions: RouterOptions,
    serviceId: string,
    status: boolean,
  ) {
    const ServiceRepository = await PostgresServiceRepository.create(
      await routerOptions.database.getClient(),
    );
    let service = await ServiceRepository.getServiceById(serviceId);
    service = Object.values(service)[0];

    service.active = status;
    ServiceRepository.updateService(serviceId, service as ServiceDto);
  }*/
}
