import { Knex } from 'knex';
import { appDtoNameConcatpartnersId } from '../../../utils/ConcatUtil';
import { Application } from '../../domain/Application';
import { ApplicationDto } from '../../dtos/ApplicationDto';
import { ApplicationResponseDto } from '../../dtos/ApplicationResponseDto';
import { ApplicationMapper } from '../../mappers/ApplicationMapper';
import { IApplicationRepository } from '../IApplicationRepository';

export class PostgresApplicationRepository implements IApplicationRepository {
  constructor(private readonly db: Knex) {}
  async total(): Promise<number> {
    return await (await this.db<Application>('application').select('*')).length
  }

  static async create(knex: Knex<any, any[]>): Promise<IApplicationRepository> {
    return new PostgresApplicationRepository(knex);
  }

  async createApplication(applicationDto: ApplicationDto,partnerId: string): Promise<Application | string> {
    try{
      const application: Application = Application.create({
        creator: applicationDto.creator,
        name:  applicationDto.name,
        active: applicationDto.active,
        externalId: appDtoNameConcatpartnersId(applicationDto, partnerId),
        partner: partnerId
      });
      const data = await ApplicationMapper.toPersistence(application);
      await this.db('application').insert(data)
      return application;
    }
    catch(error:any){
      throw new Error(error.message);    
    }

  }

  async getApplicationByCreator(creator: string, limit: number, offset:number): Promise<Application[] | void> {
    try {
      const application = await this.db<Application>('application')
      .select('*')
      .where('creator', creator)
      .limit(limit)
      .offset(offset)
    return application;      
    } 
    catch(error:any) {
      throw new Error(error.message);     
    }

  }

  async getApplication(limit: number, offset: number): Promise<Application[]> {
    try {
      const application = await this.db<Application>('application').select('*').limit(limit).offset(offset)
      const applicationDomain = ApplicationResponseDto.create({applications: application});
      const responseData = await ApplicationMapper.listAllApplicationsToResource(applicationDomain);
      return responseData.applications;      
    } 
    catch (error:any) {
      throw new Error(error.message);   
    }
  }

  // method get one application by id
  async getApplicationById(id: string): Promise<Application | string> {
    try {
      const application = await this.db<Application>('application')
      .where('id', id)
      .limit(1)
      .select()
      const applicationDomain = ApplicationResponseDto.create({applicationIt: application});
      const responseData = await ApplicationMapper.listAllApplicationsToResource(applicationDomain);
      return responseData.application;      
    }
    catch (error:any) {
      throw new Error(error.message);    
    }

  }

  async saveApplication(applicationDto: ApplicationDto, partnerId: string): Promise<Application> {
    try{
      const application: Application = Application.create({
        creator: applicationDto.creator,
        name: appDtoNameConcatpartnersId(applicationDto, partnerId),
        active: applicationDto.active,
        externalId: appDtoNameConcatpartnersId(applicationDto, partnerId),
      });
      ApplicationMapper.toPersistence(application);
      return application;
    }
    catch(error:any){
      throw new Error(error.message);     
    }

  }

  // method to delete application
  async deleteApplication(id: string): Promise<void> {
    try{
      await this.db<Application>('application').where('id', id).del()
    }
    catch(error:any){
      throw new Error(error.message);  
    }
  }

  // asyn function to update full application object
  async updateApplication(id: string,applicationDto: ApplicationDto,partnerId: string): Promise<Application | string> {
    try {
      const application: Application = Application.create({
        creator: applicationDto.creator,
        name: applicationDto.name,
        active: applicationDto.active,
        externalId: appDtoNameConcatpartnersId(applicationDto, partnerId)
      });
      // const data = await ApplicationMapper.toPersistence(application);
      await this.db('application').where('id', id).update(applicationDto)
      return application    
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }

  }

  async patchApplication(id: string,applicationDto: ApplicationDto,_partnerId: string): Promise<Application | string> {
    try{
      const application = {
        creator: applicationDto.creator,
        name: applicationDto.name,
        active: applicationDto.active,
      };  
      await this.db('application').where('id', id).update(application)
      return "ok"
    }
    catch(error:any){
      throw new Error(error.message);     
    }

  }
}
