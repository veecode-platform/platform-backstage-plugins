import { Knex } from 'knex';
import { Partner } from '../../domain/Partner';
import { PartnerDto } from '../../dtos/PartnerDto';
import { PartnerResponseDto } from '../../dtos/PartnerResponseDto';
import { PartnerMapper } from '../../mappers/PartnerMapper';
import { IPartnerRepository } from '../IPartnerRepository';

export class PostgresPartnerRepository implements IPartnerRepository {
  constructor(private readonly db: Knex) {}

  static async create(knex: Knex<any, any[]>): Promise<IPartnerRepository> {
    return new PostgresPartnerRepository(knex);
  }

  public async total(): Promise<number> {
    return await (
      await this.db<Partner>('partner').select('*')
    ).length;
  }


  async getPartnerByUser(email: string): Promise<Partner[] | void> {
    try {
      const partner = await this.db<Partner>('partner').where('email', email).select('*')
      return partner;     
    } 
    catch (error:any) {
      throw new Error(error.message); 
    }

  }
  async getPartnerIdByUserName(name: string): Promise<Partner | void> {
    try {
      const partner = await this.db<Partner>('partner')
      .where('name', name)
      .first()
      .select('*')
    return partner;      
    } 
    catch (error:any) {
      throw new Error(error.message);    
    }
  }

  async getPartnerByEmail(email: string): Promise<PartnerDto[] | void> {
    try{
      const partner = await this.db<PartnerDto>('partner').where('email', email).select('*')
      return partner;
    }
    catch(error:any){
      throw new Error(error.message);      
    }
  }

  async getPartner(offset: number, limit: number): Promise<Partner[]> {
    try {
      const partner = await this.db<Partner>('partner').select('*').offset(offset).limit(limit)
      const partnerDomain = PartnerResponseDto.create({ partners: partner });
      const responseData = await PartnerMapper.listAllPartnersToResource(partnerDomain);
      return responseData.partners     
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }
  }

  // method get one partner by id
  async getPartnerById(id: string): Promise<Partner | string> {
    try{
      const partner = await this.db<Partner>('partner').where('id', id).limit(1).select()
      const partnerDomain = PartnerResponseDto.create({ partnerIt: partner });
      const responseData = await PartnerMapper.listAllPartnersToResource(partnerDomain);
      return responseData.partner;
    }
    catch(error:any){
      throw new Error(error.message);     
    }
  }

  async savePartner(partnerDto: PartnerDto): Promise<Partner> {
    try {
      const partner: Partner = Partner.create({
        name: partnerDto.name,
        active: partnerDto.active,
        email: partnerDto.email,
        keycloakId: partnerDto.keycloakId
      });
      return partner;  
    } 
    catch (error:any) {
      throw new Error(error.message);   
    }

  }

  // method to delete partner
  async deletePartner(id: string): Promise<void> {
    try {
      await this.db<Partner>('partner').where('id', id).del()
    } 
    catch (error:any) {
      throw new Error(error.message);    
    }
  }

  async createPartner(partnerDto: PartnerDto): Promise<Partner | string> {
    try{
      const partner: Partner = Partner.create({
        name: partnerDto.name,
        active: partnerDto.active,
        email: partnerDto.email,
        keycloakId: partnerDto.keycloakId
      });
      const data = await PartnerMapper.toPersistence(partner);
      await this.db('partner').insert(data)
      return partner
    }
    catch(error:any){
      throw new Error(error.message);     
    }
  }
  // asyn function to update full partner object
  async updatePartner(id: string,partnerDto: PartnerDto): Promise<Partner | string> {
    try {
      const partner: Partner = Partner.create({
        name: partnerDto.name,
        active: partnerDto.active,
        email: partnerDto.email,
        keycloakId: partnerDto.keycloakId
      });
      const data = await PartnerMapper.toPersistence(partner);
      await this.db('partner').where('id', id).update(data)
      return partner;      
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }
  }

  // async function to patch partial  partner object partial class type
  async patchPartner(id: string,partnerDto: PartnerDto,): Promise<Partner | string> {
    try{
      const partner: Partner = (await this.getPartnerById(id)) as Partner;
      await this.db('partner').where('id', id).update(partnerDto)
      return partner
    }
    catch(error:any){
      throw new Error(error.message);
    }
  }
}
