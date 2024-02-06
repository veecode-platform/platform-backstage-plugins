import { ApplicationDto } from "../dtos/ApplicationDto";
import { Application } from "../domain/Application";

export interface IApplicationRepository {
  getApplication(limit: number, offset: number): Promise<Application[]>;
  getApplicationByCreator(creator: string, limit:number, offset:number): Promise<Application[] | void>;
  getApplicationById(id: string): Promise<Application | string>;
  saveApplication(applicationDto: ApplicationDto, partnerId: string): Promise<Application>;
  deleteApplication(id: string): Promise<void>;
  createApplication(applicationDto: ApplicationDto, partnerId: string): Promise<Application | string>;
  patchApplication(id: string, applicationDto: ApplicationDto, partnerId: string): Promise<Application | string>;
  updateApplication(id: string, applicationDto: ApplicationDto, partnerId: string): Promise<Application | string>;
  total(): Promise<number>;
}