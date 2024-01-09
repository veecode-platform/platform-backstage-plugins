import { Knex } from 'knex';
import { SECURITY, Service } from '../../domain/Service';
import { ServiceDto } from '../../dtos/ServiceDto';
import { ServiceResponseDto } from '../../dtos/ServiceResponseDto';
import { ServiceMapper } from '../../mappers/ServiceMapper';
import { IServiceRepository } from '../IServiceRepository';

export class PostgresServiceRepository implements IServiceRepository {
  constructor(private readonly db: Knex) {}
  async total(): Promise<number> {
    return await (
      await this.db<Service>('service').select('*')
    ).length;
  }

  static async create(knex: Knex<any, any[]>): Promise<IServiceRepository> {
    return new PostgresServiceRepository(knex);
  }

  async getServiceByUser(name: string): Promise<Service[] | void> {
    try{
      const service = await this.db<Service>('service').where('email', name).select('*')
      return service;
    }
    catch(error:any){
      throw new Error(error.message);      
    }
  }

  async getService(limit: number, offset: number): Promise<Service[]> {
    try{
      const service = await this.db<Service>('service').select('*').limit(limit).offset(offset)
      const servicesDomain = ServiceResponseDto.create({ services: service });
      const responseData = await ServiceMapper.listAllServicesToResource(servicesDomain);
      return responseData.services ?? [];
    }
    catch(error:any){
      throw new Error(error.message)
    }   
  }

  // method get one service by id
  async getServiceById(id: string): Promise<Service> {
    try{
      const service = await this.db<Service>('service').where('id', id).limit(1).select()
      const serviceDomain = ServiceResponseDto.create({ serviceIt: service });
      const responseData = await ServiceMapper.listAllServicesToResource(serviceDomain);
      return responseData.service as Service;
    }
    catch(error:any){
      throw new Error(error.message)
    }   

  }

  async getServiceByKongId(id: string): Promise<Service | string> {
    try{
      const service = await this.db<Service>('service').where('kongServiceId', id).limit(1).select('')    
      const serviceDomain = ServiceResponseDto.create({ serviceIt: service });
      const responseData = await ServiceMapper.listAllServicesToResource(serviceDomain);
      return responseData.service as Service;
    }
    catch(error:any){
      throw new Error(error.message)
    }  
    

  }

  async saveService(serviceDto: ServiceDto): Promise<Service> {
    try{
      const service: Service = Service.create({
        name: serviceDto.name,
        active: serviceDto.active,
        description: serviceDto.description,
        kongServiceName: serviceDto.kongServiceName,
        kongServiceId: serviceDto.kongServiceId,
        rateLimiting: parseInt(serviceDto.rateLimiting?.value as string, 10),
        securityType: serviceDto.securityType as SECURITY,
      });
      await ServiceMapper.toPersistence(service);
      await this.db('service').insert(service)
      return service;
    }
    catch(error:any){
      throw new Error(error.message);    
    }
}


  // method to delete service
  async deleteService(id: string): Promise<void> {
    try {
      await this.db<Service>('service').where('id', id).del()
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }

  }

  async createService(serviceDto: ServiceDto): Promise<Service | string> {
    try{
      const rateLimitingIntValue = parseInt(serviceDto.rateLimiting.value, 10)
      const service: Service = Service.create({
        name: serviceDto.name,
        active: serviceDto.active,
        description: serviceDto.description,
        kongServiceName: serviceDto.kongServiceName,
        kongServiceId: serviceDto.kongServiceId,
        rateLimiting: rateLimitingIntValue,
        rateLimitingBy: rateLimitingIntValue !== 0 ? serviceDto.rateLimiting.limitBy : "",
        rateLimitingType: rateLimitingIntValue !== 0 ? serviceDto.rateLimiting.type : "",
        securityType: serviceDto.securityType as SECURITY,
      });
      const data = await ServiceMapper.toPersistence(service);
      await this.db('service').insert(data)
      return service ;
    }
    catch(error:any){
      throw new Error(error.message)
    }
    
  }
  // asyn function to update full service object
  async updateService(id: string,serviceDto: ServiceDto): Promise<Service | string> {
    try{
      const rateLimitingIntValue = parseInt(serviceDto.rateLimiting.value, 10)
      const service: Service = Service.create({
        name: serviceDto.name,
        active: serviceDto.active,
        description: serviceDto.description,
        kongServiceName: serviceDto.kongServiceName,
        kongServiceId: serviceDto.kongServiceId,
        rateLimiting: rateLimitingIntValue,
        rateLimitingBy: rateLimitingIntValue !== 0 ? serviceDto.rateLimiting.limitBy : "",
        rateLimitingType: rateLimitingIntValue !== 0 ? serviceDto.rateLimiting.type : "",
        securityType: serviceDto.securityType as SECURITY,
      });
      const data = await ServiceMapper.toPersistence(service);
      await this.db('service').where('id', id).update(data)
      return service 
    }
    catch(error:any){
      throw new Error(error.message)
    }
  }

  // async updateService(code: string, serviceDto: ServiceDto): Promise<Service | null> {
  //     return null;
  // }
  // async function to patch partial  service object partial class type
  async patchService(id: string,serviceDto: any): Promise<Service | string> {
    try{
      const service: Service = (await this.getServiceById(id)) as Service;
      await this.db('service').where('id', id).update(serviceDto)
      return service;
    }
    catch(error:any){
      throw new Error(error.message);     
    }

  }
}
