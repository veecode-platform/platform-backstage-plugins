import { Router } from "express";
import express from 'express';
import { RouterOptions } from "./router";
import { PostgresApplicationRepository } from "../modules/applications/repositories/knex/KnexApplicationRepository";
import { Application } from "../modules/applications/domain/Application";
import { ApplicationDto } from "../modules/applications/dtos/ApplicationDto";
import { ApplicationServices } from "../modules/applications/services/ApplicationServices";
// import { AssociateService } from "../modules/kong-control/AssociateService";
import { KongHandler, security } from "../modules/kong-control/KongHandler";
import { PostgresApplicationServiceRepository } from "../modules/applications/repositories/knex/KnexApplicationServiceRepository";
// import { PostgresApplicationPartnerRepository } from "../modules/applications/repositories/knex/KnexApplicationPartnerRepository";
import { PostgresPartnerRepository } from "../modules/partners/repositories/Knex/KnexPartnerRepository";
import { serviceErrorHandler } from '../modules/utils/ErrorHandler';

/** @public */
export async function createApplicationRouter(
  options: RouterOptions,
): Promise<Router> {

  const {identity} = options

  const applicationRepository = await PostgresApplicationRepository.create(await options.database.getClient());
  const applicationServiceRepository = await PostgresApplicationServiceRepository.create(await options.database.getClient())
  const partnerRepository = await PostgresPartnerRepository.create(await options.database.getClient())
  // const applicationPartnerRepository = await PostgresApplicationPartnerRepository.create(await options.database.getClient())

  const router = Router()
  const kongHandler = new KongHandler()
  // const associateService = new AssociateService();
  router.use(express.json())

  router.get('/', async (request, response, next) => {
    try {
      const user = await identity.getIdentity({ request: request });
      const isAdmin = user?.identity.userEntityRef.split(':')[0] === "admin" ? true : false
      const creator = user?.identity.userEntityRef.split("/")[1] as string
      const limit: number = request.query.limit as any;
      const offset: number = request.query.offset as any;
      const responseData =  isAdmin ? await applicationRepository.getApplication(limit, offset) : await applicationRepository.getApplicationByCreator(creator, 10, 0)
      const total = await applicationRepository.total();
      response.json({ status: 'ok', applications: responseData, total: total });
    } 
    catch (error) {
      next(error)
    }
  });

  router.get('/partners/:id', async (request, response, next) => {// get applications by creator
    try {
      const creator = request.params.id
      const limit: number = request.query.limit as any;
      const offset: number = request.query.offset as any;
      const responseData =  await applicationRepository.getApplicationByCreator(creator, limit, offset)
      const total = await applicationRepository.total();
      response.json({ status: 'ok', applications: responseData, total: total });
    } 
    catch (error) {
      next(error)
    }
  });



  router.post('/', async (request, response, next) => {
    try {
      const data = request.body.application;
      const partner = await partnerRepository.getPartnerIdByUserName(data.creator) as any
      await ApplicationServices.Instance.createApplication(data,partner.id, options);
      const result = await applicationRepository.createApplication(data, partner.id) as Application;
      await applicationServiceRepository.associate(result._id as string, data.services)     
      response.send({ status: 'ok', message: "Application created", result: result});
    } 
    catch (error) {
      next(error)
    }
  });

  router.patch('/:id', async (request, response, next) => {
    try {
      const data: ApplicationDto = request.body.application;
      const applicationId = request.params.id;
      const partner = await partnerRepository.getPartnerIdByUserName(data.creator) as any
      await applicationRepository.patchApplication(applicationId, data, partner);
      if(data.services.length > 0) {
        await ApplicationServices.Instance.updateApplication(applicationId, data, options);
      }   
      response.send({ status: 'OK', message: "Application updated"});
    }
    catch (error) {
      next(error)
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const code = request.params.id;
      const result = await applicationRepository.getApplicationById(code);
      response.send({ status: 'ok', application: result });
    } 
    catch (error) {
      next(error)
    }
  });

  router.delete('/:id', async (request, response, next) => {      
    try {
      const id = request.params.id;
      await ApplicationServices.Instance.removeApplication(id, options);
      await applicationServiceRepository.deleteApplication(id)
      await applicationRepository.deleteApplication(id);
      response.status(200).json({ status: 'ok', message:"Application deleted" })
    } 
    catch (error) {
      next(error)
    }
  });

  // associate applications with servicesId

  router.get('/:id/services', async (request, response, next) => {
    try {
      const idApplication = request.params.id;
      const services = await applicationServiceRepository.getServicesByApplication(idApplication)
      const promises = await Promise.all(services.map(async (service: any) => {
        const route = await kongHandler.listRoutesFromService(service.kongServiceId)
        return {
          ...service,
          route: route
        }
      }))
      response.status(200).json({ services: promises })
    } 
    catch (error) {
      next(error)
    }
  });

  router.post('/services/:idApplication', async (request, response, next) => {
    try {
      const idApplication = request.params.idApplication;
      const servicesId = request.body.servicesId as string[];
      const services = await applicationServiceRepository.associate(idApplication, servicesId)
      response.status(200).json({ services: services })
    } 
    catch (error) {
      next(error)
    }
  });


  router.patch('/associate/:id', async (request, response, next) => {
    try {
      const id = request.params.id;
      const listServicesId: string[] = request.body.services;
      await applicationServiceRepository.associate(id, listServicesId);
      response.status(200).json({ status: 'ok', application: applicationRepository });
    } 
    catch (error) {
      next(error)
    }
  });


  // CREDENTIALS 

  router.post('/:idApplication/credentials', async (req, res, next) => {
    try {
      const id = req.params.idApplication;
      const type = req.body.type as security
      await kongHandler.generateCredential(options,id,type);
      res.status(201).json({ status: 'ok', message:`created ${type} credential` });
    } 
    catch (error) {
      next(error)
    }
  });

  router.get('/:idApplication/credentials', async (req, res, next) => { 
    try {
      const id = req.params.idApplication;
      const serviceStore = await kongHandler.listCredentialWithApplication(options,id);
      res.status(200).json({ status: 'ok', credentials: serviceStore });
    } 
    catch (error) {
      next(error)
    }
  });


  router.delete('/:idApplication/credentials', async (request, response, next) => {
    try {
      const idCredential = request.query.idCredential as string;
      const type = request.query.type as security;

      const idApplication = request.params.idApplication;
      await kongHandler.removeCredencial(options,idApplication,idCredential,type);
      response.status(200).json({ status: 'ok', message: `deleted ${type} credential` });
    } 
    catch (error) {
      next(error)
    }
  });

  router.use(serviceErrorHandler)
  return router;
}