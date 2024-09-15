import { Entity } from "@backstage/catalog-model";
import { AuthAdapters, IHandlerCatalogEntity } from "./types";
import { CatalogApi } from '@backstage/catalog-client';
import { NotFoundError } from "@backstage/errors";
import { ISpec } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export class HandlerCatalogEntity implements IHandlerCatalogEntity {

    constructor(
        private catalog : CatalogApi,
        private authAdapters : AuthAdapters
    ){}

    private async getToken(): Promise<string> {
      const { auth } = this.authAdapters;
      const { token } = await auth.getPluginRequestToken({
        onBehalfOf: await auth.getOwnServiceCredentials(),
        targetPluginId: 'catalog'
      });
      return token
    }

    async getEntity(kind:string, entityName:string) : Promise<Entity>{
      const token = await this.getToken(); 
      const response = await this.catalog.getEntities(
        { filter: {kind, 'metadata.name': entityName}},
        { token },
      );

      if (!response) {
        throw new NotFoundError(
          `No ${kind} entity named "${entityName}"`,
        );
      }
      return response.items[0];    
    }

    async getSpecs(specs:string[]) : Promise<ISpec[]> {
        
      const specsData = await Promise.all(
          specs.map(async (spec) => { 
            const specData = await this.getEntity('Api',spec);
            return {
              metadata:{
                namespace: specData.metadata.namespace ?? 'default',
                annotations: specData.metadata.annotations ?? {},
                name: specData.metadata.name,
                title: specData.metadata.name,
                publishedAt: new Date(specData.metadata.publishedAt as string) ?? Date.now(),
                description: specData.metadata.description ?? '',
                tags: specData.metadata.tags ?? [],
                uid: specData.metadata.uid,
                etag: specData.metadata.etag ?? ''
              },
              apiVersion: specData.apiVersion,
              kind: specData.kind,
              spec: {
                type: specData.spec!.type,
                lifecycle: specData.spec!.lifecycle,
                owner: specData.spec!.owner,
                definition: specData.spec!.definition
              },
              relations: specData.relations!.map(rel => ({
                type: rel.type,
                targetRef: rel.targetRef
              }))
            }; 
          })
        );
      
        return specsData as ISpec[];
    }
    
}