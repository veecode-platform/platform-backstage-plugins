import { Entity } from "@backstage/catalog-model";
import { CatalogResponse, IHandlerCatalogEntity } from "./types";
import { ISpec } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export class HandlerCatalogEntity implements IHandlerCatalogEntity {

    constructor(
        private backendBaseUrl :string,
    ){}

    async getEntity(kind:string, entityName: string): Promise<Entity>{
        const response = await fetch(`${this.backendBaseUrl}/api/catalog/entities/by-query?filter=kind=${kind},metadata.name=${entityName}`);
  
        if(!response.ok) throw new Error (`Failed to fetch entity: ${response.statusText}`);
  
        const {items : entities } : CatalogResponse<Entity> = await response.json();
  
        return entities[0] as Entity
      }

    async getSpecs(specs:string[]) : Promise<ISpec[]> {
        
      const specsResponse: ISpec[] = await Promise.all(
          specs.map(async (spec) => { 
            const specData = await this.getSpec(spec);
            return specData as ISpec; 
          })
        );
      
        return specsResponse;
    }
  
    async getSpec (specName:string): Promise<ISpec>{
      const response = await fetch(`${this.backendBaseUrl}/api/catalog/entities/by-query?filter=kind=api,metadata.name=${specName}`);
    
      if(!response.ok) throw new Error (`Failed to fetch spec: ${response.statusText}`);

      const {items : specs } : CatalogResponse<ISpec> = await response.json();

      return specs[0] as ISpec
    }
  
}