/* eslint-disable @backstage/no-undeclared-imports */
import {
    CatalogProcessor,
    CatalogProcessorCache,
    CatalogProcessorEmit,
    CatalogProcessorParser,
    processingResult,
} from "@backstage/plugin-catalog-node";
import { LocationSpec } from "@backstage/plugin-catalog-common";
import { Config } from "@backstage/config";
import {readProviderConfigs,InfracostProviderConfig} from "../lib/config";
import * as winston from "winston";
import { CacheService } from "@backstage/backend-plugin-api";
import {
    Entity,
    getCompoundEntityRef,
    parseEntityRef, 
    RELATION_OWNED_BY,
    RELATION_OWNER_OF,
} from "@backstage/catalog-model";
import {
    isInfracostType
} from "../lib/transformers";
import type { InfracostEntityV1alpha1 as InfracostEntity } from "../model";
import { InfracostEntityV1alpha1Validator } from "../model";
// import { UrlReader } from "@backstage/backend-common";

export class APICEntityProcessor implements CatalogProcessor {

    private config: Config;
    private providerConfig: InfracostProviderConfig;
    // private readonly reader: UrlReader;
    private logger: winston.Logger;
    private cache: CacheService;
    private readonly validators = [InfracostEntityV1alpha1Validator];

    getProcessorName(): string {
        return "InfracostEntitiesProcessor";
    }

    constructor(config: Config, logger: winston.Logger, /* reader: UrlReader,*/ cache: CacheService) {
        this.config = config;
        this.logger = logger;
       // this.reader = reader;
        this.cache = cache;
        this.providerConfig = readProviderConfigs(this.config)[0];
    }

    async validateEntityKind(entity: Entity): Promise<boolean> {
        for (const validator of this.validators) {
          if (await validator.check(entity)) {
            return true;
          }
        }
        return false;
      }

    readLocation(
       location: LocationSpec, 
       _optional: boolean, 
       _emit: CatalogProcessorEmit, 
       _parser: CatalogProcessorParser, 
       _: CatalogProcessorCache
      ): Promise<boolean> {
        if (location.type !== 'url' && this.cache && this.providerConfig && this.logger) {
            return Promise.resolve(false);
        }

        return Promise.resolve(false);
    }

    preProcessEntity(
      entity: Entity, 
      _location: LocationSpec, 
      _emit: CatalogProcessorEmit, 
      _originLocation: LocationSpec, 
      _cache: CatalogProcessorCache
    ): Promise<Entity> {
        return Promise.resolve(entity);
    }

    async postProcessEntity(
        entity: Entity, 
        _location: LocationSpec, 
        emit: CatalogProcessorEmit, 
        _cache: CatalogProcessorCache
      ): Promise<Entity> {

        const selfRef = getCompoundEntityRef(entity);
        if (isInfracostType(entity)) {
            const infracost = entity as InfracostEntity;
            const owner = infracost.spec.owner;
            if (owner !== undefined && owner.length) {
                const targetRef = parseEntityRef(owner, {
                    defaultKind: 'Group',
                    defaultNamespace: selfRef.namespace,
                  });
                  emit(
                    processingResult.relation({
                      source: selfRef,
                      type: RELATION_OWNED_BY,
                      target: {
                        kind: targetRef.kind,
                        namespace: targetRef.namespace,
                        name: targetRef.name,
                      },
                    }),
                  );
                  emit(
                    processingResult.relation({
                      source: {
                        kind: targetRef.kind,
                        namespace: targetRef.namespace,
                        name: targetRef.name,
                      },
                      type: RELATION_OWNER_OF,
                      target: selfRef,
                    }),
                  );
            }
        } 
        return entity;
    }


}