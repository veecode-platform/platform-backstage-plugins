import { Router } from 'express';
import express from 'express';
import { ControllPlugin } from '../modules/services/service/ControllPlugin';
import { PostgresServiceRepository } from '../modules/services/repositories/Knex/KnexServiceReppository';
import { RouterOptions } from './router';
import { ServiceDto } from '../modules/services/dtos/ServiceDto';
// import { AxiosError } from 'axios';
// import { AuthorizeResult } from '@backstage/plugin-permission-common';
// import { adminAccessPermission } from '@veecode-platform/plugin-application-common';// nome da permissao criada anteriormente no plugin-common
// import { NotAllowedError } from '@backstage/errors';
// import { getBearerTokenFromAuthorizationHeader } from '@backstage/plugin-auth-node';
import { PostgresApplicationServiceRepository } from '../modules/applications/repositories/knex/KnexApplicationServiceRepository';
import { PostgresPartnerServiceRepository } from '../modules/partners/repositories/Knex/knexPartnerServiceRepository';
import { PostgresPluginRepository } from '../modules/plugins/repositories/Knex/KnexPluginRepository';
import { Service } from '../modules/services/domain/Service';
import { serviceErrorHandler } from '../modules/utils/ErrorHandler';

/** @public */
export async function createServiceRouter(
  options: RouterOptions,
): Promise<Router> {
  // const { permissions } = options;

  const serviceRepository = await PostgresServiceRepository.create(await options.database.getClient());
  const applicationServiceRepository = await PostgresApplicationServiceRepository.create(await options.database.getClient())
  const partnerServiceRepository = await PostgresPartnerServiceRepository.create(await options.database.getClient())
  const pluginRepository = await PostgresPluginRepository.create(await options.database.getClient())
  const controllPlugin = new ControllPlugin();
  
  const serviceRouter = Router();
  serviceRouter.use(express.json());

  serviceRouter.get('/', async (request, response, next) => {
    /* const token = getBearerTokenFromAuthorizationHeader(request.header('authorization'));
    const decision = (await permissions.authorize([{ permission: adminAccessPermission }], {token: token}))[0];
    if (decision.result === AuthorizeResult.DENY) {
      throw new NotAllowedError('Unauthorized');
    }*/
    try{
      const limit: number = request.query.limit as any;
      const offset: number = request.query.offset as any;
      const services = await serviceRepository.getService(limit, offset);
      const total = await serviceRepository.total()
      response.status(200).json({ status: 'ok', services: services, total: total });
    }
    catch(error){
      next(error)
    }
  });


  serviceRouter.get('/:id', async (request, response, next) => {
    try{
      const code = request.params.id;
      const service = await serviceRepository.getServiceById(code);
      response.status(200).json({ status: 'ok', service: service });
    }
    catch(error){
      next(error)
    }
  });

  serviceRouter.get('/:id/partners', async (request, response, next) => {
    try{
      const serviceId = request.params.id;
      const partners = await partnerServiceRepository.getPartnerByservice(serviceId)
      response.status(200).json({ status: 'ok', partners: partners });
    }
    catch(error){
      next(error)
    }
  });

  serviceRouter.post('/', async (request, response, next) => {
    try {
      const service: ServiceDto = request.body.service;
      let plugins: Array<any> = []
      if(!options.config.getBoolean("platform.apiManagement.readOnlyMode")) {
        plugins = await controllPlugin.applySecurityType(service) as any;
      }
          
      const result = await serviceRepository.createService(service) as Service;
      if(plugins.length !== 0){
        plugins.forEach((p)=>{
          pluginRepository.createPlugin({
            name: p.name,
            kongPluginId: p.id,
            service: result._id as string
          })
        })
      }
      response.status(201).json({ status: 'ok', message: "Service created", service: result });
    } catch (error) {
        next(error)
    }
  });

  serviceRouter.patch('/:id', async (request, response, next) => {
    try {
      const serviceId = request.params.id
      const service = request.body.service;

      if(service.partnersId !== undefined){
        const partners = service.partnersId
        await partnerServiceRepository.deleteService(serviceId)
        await partnerServiceRepository.associatePartnersToService(partners, serviceId)
        response.status(201).json({ status: 'ok', message: "Service updated"});
      }   
      await controllPlugin.updateServicePlugins(serviceId, service, options)
      response.status(201).json({ status: 'ok', message: "Service updated"})    

    } catch (error) {
      next(error)
    }
  });
  
  serviceRouter.delete('/:id', async (request, response, next) => {
    try{
      const serviceId = request.params.id;
      await controllPlugin.deleteService(serviceId, options)
      await applicationServiceRepository.deleteService(serviceId)
      await partnerServiceRepository.deleteService(serviceId)
      await serviceRepository.deleteService(serviceId);
      response.status(200).json({ status: 'ok', message: "Service deleted"});
    }
    catch(error){
      next(error)
    }
  });

  serviceRouter.use(serviceErrorHandler)
  return serviceRouter;

}




