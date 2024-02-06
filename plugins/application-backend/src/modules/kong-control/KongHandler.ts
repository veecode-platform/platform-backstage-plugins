// class to access kong api manager service
import axios from 'axios';
import { Application, ApplicationProps } from '../applications/domain/Application';
import { PostgresApplicationRepository } from '../applications/repositories/knex/KnexApplicationRepository';

import { RouterOptions } from '../../service/router';
import { CredentialsOauth } from '../kong/services/CredentialsOauth';
import { KongServiceBase } from '../kong/services/KongServiceBase';
import { Credential } from './Credential';
import { CredentialOauth } from './CredentialOauth2';

export enum security {
  oauth = 'oauth2',
  key_auth = 'key-auth'
}

type Service = {
  name: string;
  id: string;
};


export class KongHandler extends KongServiceBase {

  public async listRoutesFromService(kongServiceNameOrId:string):Promise<string>{
    try{
      const url = `${await this.getUrl()}/services/${kongServiceNameOrId}/routes`
      const {data} = await axios.get(url);
      const info = data.data[0]
      return `${info.protocols[0]}://${info.hosts[0]}${info.paths[0]}`
    }

    catch(error:any){
      throw new Error(error.message)
    }

  }


  public async listServices(): Promise<Service[]> {
    try {
      const url = `${await this.getUrl()}/services`
      const response = await axios.get(url);
      const servicesStore = response.data.data;
      return response ? servicesStore.map((service: Service) => { return { name: service.name, id: service.id };}): [];     
    } 
    catch (error:any) {
      throw new Error(error.message);      
    }

  }

  public async listRoutes(): Promise<Service[]> {
    try {
      const url = `${await this.getUrl()}/routes`
      const response = await axios.get(url);
      const servicesStore = response.data.data;
      return response
        ? servicesStore.map((service: Service) => service.name)
        : [];      
    } catch (error:any) {
      throw new Error(error.message);   
    }

  }

  public async listConsumers() {
    try{
      const url = `${await this.getUrl()}/consumers`
      const response = await axios.get(url);
      const consumers = response.data;
      return consumers;
    }
    catch(error:any){
      throw new Error(error.message);    
    }
  }

  // PLUGINS
  public async applyPluginToRoute(): Promise<Service[]> {
    try {
      const url = `${await this.getUrl()}/services`
      const response = await axios.get(url);
      const servicesStore = response.data.data;
      return response
        ? servicesStore.map((service: Service) => service.name)
        : [];      
    } 
    catch (error:any) {
      throw new Error(error.message);    
    }
  }

  public async applyPluginToService(serviceName: string,pluginName: string): Promise<Service[]> {
    try {
      const url = `${await this.getUrl()}/services/${serviceName}/plugins`;
      const response = await axios.post(url, {
        name: `${pluginName}`,
      });
      const servicesStore = response.data;
      return servicesStore;
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }

  }
  public async updatePluginService(serviceName: string,pluginName: string): Promise<Service[]> {
    try {
      const url = `${await this.getUrl()}/services/${serviceName}/plugins`;
      const response = await axios.post(url, {
        name: `${pluginName}`,
      });
      const servicesStore = response.data;
      return servicesStore;      
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }

  }

  public async listPluginsService(serviceName: string): Promise<Service[]> {
    try {
      const url = `${await this.getUrl()}/services/${serviceName}/plugins`;
      const response = await axios.get(url);
      return response.data;   
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }

  }

  public async generateCredential(options: RouterOptions, idApplication: string, typeSecurity: security) {
    try {    
      const applicationRepository = await PostgresApplicationRepository.create(await options.database.getClient());
      const credentialsOauth = new CredentialsOauth();
      const application: ApplicationProps = await applicationRepository.getApplicationById(idApplication) as ApplicationProps;
      if (typeSecurity.toString() === 'key-auth') {
  
        const url = `${await this.getUrl()}/consumers/${application.externalId}/key-auth`
        const response = await axios.post(url);
  
        return response.data;
      } else if (typeSecurity.toString() === 'oauth2') {
  
        const response = await credentialsOauth.generateCredentials(`${application.externalId}`, application.externalId as string)
  
        return response;
      }
    } 
    catch (error:any) {
      throw new Error(error.message);      
    }
  }


  async listCredentialWithApplication(options: RouterOptions, id: string) {
    try {
      const applicationRepository = await PostgresApplicationRepository.create(await options.database.getClient(),);
      const application: ApplicationProps = await applicationRepository.getApplicationById(id) as ApplicationProps;
  
      const url = `${await this.getUrl()}/consumers/${application.externalId}/key-auth`
      const urlOath = `${await this.getUrl()}/consumers/${application.externalId}/oauth2`
  
      const response = await axios.get(url);
      const responseOauth = await axios.get(urlOath);
      const keyauths = response.data.data;
      const keyoauth = responseOauth.data.data;
      const credentials: any[] = []
      for (let index = 0; index < keyauths.length; index++) {
        const credencial = new Credential(keyauths[index].id, keyauths[index].key, "key-auth")
        credentials.push(credencial);
      }
      for (let index = 0; index < keyoauth.length; index++) {
        const credencial = new CredentialOauth(keyoauth[index].id, keyoauth[index].key, keyoauth[index].client_id, keyoauth[index].client_secret, 'oauth2')
        credentials.push(credencial);
      } 
      return credentials;      
    } 
    catch (error:any) {
      throw new Error(error.message);      
    }

  }

  public async removeCredencial(options: RouterOptions, idApplication: string, idCredencial: string, typeSecurity: security) {
    try {
      const applicationRepository = await PostgresApplicationRepository.create(await options.database.getClient());
      const application: Application = await applicationRepository.getApplicationById(idApplication) as Application
  
      const url = `${await this.getUrl()}/consumers/${application.externalId}/${typeSecurity.toString()}/${idCredencial}`
  
        const response = await axios.delete(url);
        return response.data;
    } 
    catch (error:any) {
      throw new Error(error.message);    
    }
  }

  public async deletePluginsService(serviceName: string,pluginId: string): Promise<Service[]> {
    try {
      const url = `${await this.getUrl()}/services/${serviceName}/plugins/${pluginId}`;
      const response = await axios.delete(url);
      const servicesStore = response.data;
      return servicesStore;  
    } 
    catch (error:any) {
      throw new Error(error.message);    
    }
  }
}
