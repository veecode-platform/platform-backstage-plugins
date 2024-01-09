import { RouterOptions } from '../../../service/router';
import { Consumer } from '../../kong/model/Consumer';
import { ConsumerGroupService } from '../../kong/services/ConsumerGroupService';
import { ConsumerService } from '../../kong/services/ConsumerService';
import { Service } from '../../services/domain/Service';
import { PostgresServiceRepository } from '../../services/repositories/Knex/KnexServiceReppository';
import {
  appDtoNameConcatpartnersId,
  serviceConcatGroup,
} from '../../utils/ConcatUtil';
import { Application } from '../domain/Application';
import { ApplicationDto } from '../dtos/ApplicationDto';
import { PostgresApplicationRepository } from '../repositories/knex/KnexApplicationRepository';
import { PostgresApplicationServiceRepository } from '../repositories/knex/KnexApplicationServiceRepository';
import { ApiManagmentError } from '../../utils/ApiManagmentError';

export class ApplicationServices {
  private static _instance: ApplicationServices;

  public constructor() { }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async createApplication(
    application: ApplicationDto,
    partnerId: string,
    options: RouterOptions,
  ) {
    try {
      const consumer = new Consumer(appDtoNameConcatpartnersId(application, partnerId), ["managed-by-devportal"]);
      const servicesId: string[] = application.services;
      const serviceRepository = await PostgresServiceRepository.create(await options.database.getClient());

      await ConsumerService.Instance.createConsumer(consumer);

      servicesId.forEach(async s => {
        const service: Service = await serviceRepository.getServiceById(s);
        await ConsumerService.Instance.addAclToConsumer(consumer, serviceConcatGroup(service.kongServiceName as string));     
        await ConsumerGroupService.Instance.addConsumerToGroup(serviceConcatGroup(service.kongServiceName as string), consumer.username);  
      });

      return application
    }
    catch (error:any) {
      throw new ApiManagmentError(error.message, "Error creting kong consumer", 5);     
    }
  }

  public async removeApplication(
    applicationId: string,
    options: RouterOptions,
  ) {
    try {
      const applicationRepository = await PostgresApplicationRepository.create(await options.database.getClient());
      const application = await applicationRepository.getApplicationById(applicationId) as Application;
      // ConsumerGroupService.Instance.removeConsumerFromGroups(application.externalId as string);
      ConsumerService.Instance.deleteConsumer(application.externalId as string);     
    } 
    catch (error:any) {
      throw new ApiManagmentError(error.message, "Error removing kong consumer", 6);     
    }
  }

  public async updateApplication(
    applicationId: string,
    application: ApplicationDto,
    options: RouterOptions,
  ) {
    try {
      const serviceRepository = await PostgresServiceRepository.create(await options.database.getClient());
      const applicationRepository = await PostgresApplicationRepository.create(await options.database.getClient());
      const applicationServiceRepository = await PostgresApplicationServiceRepository.create(await options.database.getClient())

      const applicationFromDb = await applicationRepository.getApplicationById(applicationId) as Application;
      const newServices: string[] = application.services;
      const consumer = new Consumer(applicationFromDb.externalId as string);
      const servicesPreviouslyAssociated = await applicationServiceRepository.getServicesByApplication(applicationId)

      servicesPreviouslyAssociated.forEach( async (service: Service) => {
        await ConsumerService.Instance.removeAclFromConsumer(consumer, serviceConcatGroup(service.kongServiceName as string))
      })
      await ConsumerGroupService.Instance.removeConsumerFromGroups(consumer.username)
      await applicationServiceRepository.deleteApplication(applicationId as string)

      newServices.forEach( async (service) => {
        const serviceFromDb: Service = await serviceRepository.getServiceById(service);
        await ConsumerService.Instance.addAclToConsumer(consumer, serviceConcatGroup(serviceFromDb.kongServiceName as string));     
        await ConsumerGroupService.Instance.addConsumerToGroup(serviceConcatGroup(serviceFromDb.kongServiceName as string), consumer.username);  
      })

      await applicationServiceRepository.associate(applicationId as string, newServices)

      return newServices

    } 
    catch (error:any) {
      throw new ApiManagmentError(error.message, "Error updating kong consumer", 7);     
    }
  }
}
