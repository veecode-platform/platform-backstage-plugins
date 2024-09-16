import { Entity } from "@backstage/catalog-model";
import { AuthAdapters, IHandlerCatalogEntity, IPluginsWithPrefix } from "./types";
import { CatalogClient } from '@backstage/catalog-client';
import { NotFoundError } from "@backstage/errors";
import { IDefinition, IKongPluginSpec, IPluginSpec, IRelation, ISpec, ISpecType } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { Client } from "./client";
import { createLegacyAuthAdapters } from "@backstage/backend-common";
import { KongServiceManagerOptions } from "../utils/types";
import yaml from 'js-yaml';

export class HandlerCatalogEntity extends Client implements IHandlerCatalogEntity {

 private authAdapters: AuthAdapters;
 private catalog: CatalogClient;

 constructor(opts: KongServiceManagerOptions){
  super(opts);
  this.authAdapters = createLegacyAuthAdapters(opts);
  this.catalog = new CatalogClient({discoveryApi: opts.discovery})
 }

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

    async getSpecsByEntity(kind: string, entityName: string): Promise<ISpec[]> {
      const entity = await this.getEntity(kind,entityName);

       try{

          if (entity && entity.relations) {
           const relations = entity.relations as IRelation[];
   
           const specs: string[] = [];
   
           relations.forEach(r => {
             if (r.type === "providesApi") {
               specs.push(r.targetRef.split("/")[1]);
             }
           });
   
           if (specs.length > 0) {
             const specsResponse = await this.getSpecs(specs);
             return specsResponse;
           }
          }
         return [];

        }catch(err:any){
            throw new Error(`There was an error when trying to fetch the specs with the requested values. [${err}]`)
        }
    }

    getPluginsBySpec(spec:ISpecType) : IKongPluginSpec[] {
        const definition = spec.definition;
        const parseDefinition = yaml.load(definition) as Record<string, any>;
        const pluginsKong = Object.keys(parseDefinition)
          .filter(key => key.startsWith('x-kong'))
          .map(key => parseDefinition[key]);
  
        return pluginsKong as IKongPluginSpec[]
      }

    async getPluginsFromSpec(kind:string, entityName:string) : Promise<IPluginSpec[]>  {
       const specsEntity = await this.getSpecsByEntity(kind, entityName);
       
       const pluginsFromSpec = await Promise.all(
        specsEntity.map(async spec => ({
            name: spec.metadata.name,
            description: spec.metadata.description,
            owner: spec.spec.owner,
            tags: spec.metadata.tags ?? [],
            plugins: this.getPluginsBySpec(spec.spec)
        }))
       )

       return pluginsFromSpec as IPluginSpec[]
    }

    async addPluginsToSpec(specName:string, plugins:IKongPluginSpec[]) : Promise<IDefinition> {
        const specData = await this.getEntity('Api',specName);
        const definition = yaml.load(specData.spec!.definition as string) as IDefinition; 

        // delete kong's plugin (old state)
        for(const key in definition){
            if(key.startsWith('x-kong')){
                delete definition[key]
            }
        }
        // map new plugins
        const pluginsWithPrefix : IPluginsWithPrefix = {}; 
        
        plugins.map(plugin => {
            const pluginName = `x-kong-${plugin.name}`;
            const newData = {
                name: pluginName,
                enabled: plugin.enabled,
                config: plugin.config
            }
          pluginsWithPrefix[`${pluginName}`] = newData;
        });

        const definitionUpdated = {
            openapi: definition.openapi,
            info: definition.info,
            externalDocs: definition.externalDocs,
            servers: definition.servers,
            tags: definition.tags,
            ...pluginsWithPrefix,
            paths: definition.paths,
            components: definition.components
        };

        return definitionUpdated as IDefinition
    }
    
}