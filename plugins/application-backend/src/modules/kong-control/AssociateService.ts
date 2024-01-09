import { PluginDatabaseManager } from "@backstage/backend-common";
import { Config } from "@backstage/config";
import { Logger } from "winston";
// import { PostgresApplicationRepository } from "../applications/repositories/knex/KnexApplicationRepository";
// import { ApplicationProps } from "../applications/domain/Application";


/** @public */
export interface RouterOptions {
  logger: Logger;
  database: PluginDatabaseManager;
  config: Config;
}

export class AssociateService{

  /* async associate(routerOptions: RouterOptions, id: string, servicesId: string[] ) { refactor 
    const applicationRepository = await PostgresApplicationRepository.create(
      await routerOptions.database.getClient(),    
    );
       const application = await applicationRepository.getApplicationById(id) as ApplicationProps;
       const idservices = application.servicesId
      if(idservices !== null){
        for (let index = 0; index < servicesId.length; index++) {
          application.servicesId.push(servicesId[index])
        }
      }else{
        application.servicesId = servicesId;
      }
      await applicationRepository.patchApplication(id, application as any);
  }

  async removeAssociate(routerOptions: RouterOptions, id: string, servicesId: string){
    const applicationRepository = await PostgresApplicationRepository.create(
      await routerOptions.database.getClient(),    
    );
    const application = await applicationRepository.getApplicationById(id) as ApplicationProps
    const tamanho = application.externalId?.length 
      for (let index = 0; index < (tamanho as number); index++) {// application.externalId.length
        if(application.servicesId[index] === servicesId){
           application.servicesId.slice(index, 1)
          break
        }
      }
      await applicationRepository.patchApplication(id, application as any);
  }
async findAllAssociate(routerOptions: RouterOptions, id: string){
  const applicationRepository = await PostgresApplicationRepository.create(
    await routerOptions.database.getClient(),    
  );
    const associates = await applicationRepository.getApplicationById(id) as ApplicationProps;
    return associates.servicesId
}*/
}
