import { PartnerDto } from "../dtos/PartnerDto";
import { Partner } from "../domain/Partner";

export interface IPartnerRepository {
  getPartner(limit: number, offset: number): Promise<Partner[]>;
  getPartnerByUser(email:string): Promise<Partner[] | void>;
  getPartnerIdByUserName(name:string): Promise<Partner | void>;
  getPartnerByEmail(email:string): Promise<PartnerDto[] | void>;
  getPartnerById(id: string): Promise<Partner| string>;
  savePartner(partnerDto: PartnerDto): Promise<Partner>;
  deletePartner(id: string): Promise<void>;
  createPartner(partnerDto: PartnerDto): Promise<Partner | string>;
  patchPartner(id: string, partnerDto: PartnerDto): Promise<Partner | string>;
  // findApplications(id: string): any;
  total(): Promise<number>
  updatePartner(code:string,partnerDto:PartnerDto): Promise<Partner | string>;
}