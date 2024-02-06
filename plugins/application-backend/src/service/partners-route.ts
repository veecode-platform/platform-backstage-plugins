import { Router } from "express";
import { RouterOptions } from "./router";
import { PostgresPartnerRepository } from "../modules/partners/repositories/Knex/KnexPartnerRepository";
import { PartnerDto } from "../modules/partners/dtos/PartnerDto";
import { PostgresPartnerApplicationRepository } from "../modules/partners/repositories/Knex/KnexPartnerApplicationRepository";
import { PostgresPartnerServiceRepository } from "../modules/partners/repositories/Knex/knexPartnerServiceRepository";
import { Partner } from "../modules/partners/domain/Partner";
import { serviceErrorHandler } from '../modules/utils/ErrorHandler';


/** @public */
export async function createPartnersRouter(options: RouterOptions,): Promise<Router> {

  const partnerRepository = await PostgresPartnerRepository.create(await options.database.getClient());
  const partnerApplicationRepository = await PostgresPartnerApplicationRepository.create(await options.database.getClient())
  const partnerServiceRepository = await PostgresPartnerServiceRepository.create(await options.database.getClient())
  const router = Router();

  router.get('/applications/:idPartner', async (request, response, next) => {
    try{
      const code = request.params.idPartner
      const applications = await partnerApplicationRepository.getApplicationsByPartner(code)
      response.status(200).json({ applications: applications })
    }
    catch (error) {
      next(error)
    }
  })

  router.get('/:id/services', async (request, response, next) => {
    try {
      const code = request.params.id
      const services = await partnerServiceRepository.getServiceByPartner(code)
      response.status(200).json({ services: services })
    } 
    catch (error) {
      next(error)
    }
  })

  router.post('/applications/:idPartner', async (request, response, next) => {
    try {
      const code = request.params.idPartner
      const applicationsId = request.body.applicationsId as string[]
      const applications = await partnerApplicationRepository.associate(code, applicationsId)
      response.status(200).json({ applications: applications })
    }
    catch (error) {
      next(error)
    }
  });

  router.post('/services/:idPartner', async (request, response, next) => {
    try {
      const code = request.params.idPartner
      const servicesId = request.body.servicesId as string[]
      const services = await partnerServiceRepository.associate(code, servicesId)
      response.status(200).json({ services: services })
    } 
    catch (error) {
      next(error)
    }
  });


  router.get('/', async (request, response, next) => {
    try {
      const offset: number = request.query.offset as any;
      const limit: number = request.query.limit as any;
      const partners = await partnerRepository.getPartner(offset, limit);
      const total = await partnerRepository.total();
  
      response.status(200).json({ status: 'ok', partners: partners, total: total });
    } 
    catch (error) {
      next(error)
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const code = request.params.id;
      const partners = await partnerRepository.getPartnerById(code);
      const total = await partnerRepository.total();
      response.status(200).json({ status: 'ok', partners: partners, total: total });
    } 
    catch (error) {
      next(error)
    }

  });

  router.post('/', async (request, response, next) => {
    try {
      const partner: PartnerDto = request.body.partner;
      const servicesId = request.body.partner.servicesId;
      const result = await partnerRepository.createPartner(partner) as Partner;
      const services = await partnerServiceRepository.associate(result._id as string, servicesId)

      response.status(201).json({ status: 'ok', partner: result, services: services, message: "Partner created" });
    }     
    catch (error) {
      next(error)
    }
  });


  router.delete('/:id', async (request, response, next) => {
    try {
      const code = request.params.id;
      const result = await partnerRepository.deletePartner(code);
      response.status(204).json({ status: 'ok', partner: result });
    }     
    catch (error) {
      next(error)
    }
  });


  router.patch('/:id', async (request, response, next) => {
    try {
      const code = request.params.id;
      const partner: PartnerDto = request.body.partner;
      const result = await partnerRepository.patchPartner(code, partner);
      response.status(200).json({ status: 'ok', partner: result });
    } 
    catch (error) {
      next(error)
    }
  });

  router.put('/:id', async (request, response, next) => {
    try {
      const code = request.params.id;
      const partner: PartnerDto = request.body.partner;
      const result = await partnerRepository.patchPartner(code, partner);
      response.status(200).json({ status: 'ok', partner: result });
    } 
    catch (error) {
      next(error)
    }
  });

  router.use(serviceErrorHandler)
  return router;
}