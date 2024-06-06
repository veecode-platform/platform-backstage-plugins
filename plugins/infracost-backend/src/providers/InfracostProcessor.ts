/* eslint-disable @backstage/no-undeclared-imports */
/*
 * Copyright 2024 CROZ d.o.o, the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    CatalogProcessor,
    CatalogProcessorCache,
    CatalogProcessorEmit,
    CatalogProcessorParser,
    EntityRelationSpec,
    processingResult,
} from "@backstage/plugin-catalog-node";
import {LocationSpec} from "@backstage/plugin-catalog-common";
import {Config} from "@backstage/config";
import {APICProviderConfig, readProviderConfigs} from "../lib/config";
import * as winston from "winston";
import {CacheService} from "@backstage/backend-plugin-api";
import {
    Entity,
    getCompoundEntityRef,
    GroupEntity,
    parseEntityRef, RELATION_API_PROVIDED_BY,
    RELATION_OWNED_BY,
    RELATION_OWNER_OF, RELATION_PROVIDES_API,
} from "@backstage/catalog-model";
import {
    connectComponentToOrganisationsAndProducts,
    connectSubscriptionsToApplications,
    isCustomerOrganisationType,
    isProductType
} from "../lib/transformers";
import {fetchApplicationCredentials, fetchApplications, fetchSubscriptions} from "../lib/apicClient";
import {ANNOTATION_APIC_CATALOGNAME, ANNOTATION_APIC_ORGNAME} from "../lib/constants";
import {Some} from "@sniptt/monads";
import {withLocations} from "./APICEntityProvider";
import {ProductEntity} from "../lib/types";

export class APICEntityProcessor implements CatalogProcessor {

    private config: Config;
    private providerConfig: APICProviderConfig;
    private logger: Logger;
    private cache: CacheService;

    getProcessorName(): string {
        return "APICEntityProcessor";
    }

    constructor(config: Config, logger: winston.Logger, cache: CacheService) {
        this.config = config;
        this.logger = logger;
        this.cache = cache;
        this.providerConfig = readProviderConfigs(this.config)[0];
    }

    validateEntityKind(entity: Entity): Promise<boolean> {

        return Promise.resolve(isProductType(entity) || isCustomerOrganisationType(entity))
    }


    readLocation(location: LocationSpec, _optional: boolean, _emit: CatalogProcessorEmit, _parser: CatalogProcessorParser, _: CatalogProcessorCache): Promise<boolean> {
        if (location.type !== 'apic' && this.cache && this.providerConfig && this.logger) {
            return Promise.resolve(false);
        }

        return Promise.resolve(false);
    }

    preProcessEntity(entity: Entity, _location: LocationSpec, _emit: CatalogProcessorEmit, _originLocation: LocationSpec, _cache: CatalogProcessorCache): Promise<Entity> {
        // this.logger.info(`processing ${stringifyEntityRef(entity)}`)

        return Promise.resolve(entity);
    }

    async postProcessEntity(entity: Entity, location: LocationSpec, emit: CatalogProcessorEmit, _cache: CatalogProcessorCache): Promise<Entity> {
        if (isProductType(entity)) {
            const product = entity as ProductEntity;
            let owner = product.spec.owner;
            if (owner !== undefined && owner.length) {
                emit(
                    processingResult.relation({
                    type: RELATION_OWNED_BY,
                    source: getCompoundEntityRef(product),
                    target: parseEntityRef(product.spec.owner),
                } as EntityRelationSpec)
                );
                emit(
                    processingResult.relation({
                        type: RELATION_OWNER_OF,
                        source: parseEntityRef(product.spec.owner),
                        target: getCompoundEntityRef(product)
                    } as EntityRelationSpec)
                );
            }
            if (product.spec.providesApis) {
                for (let providedApi of product.spec.providesApis) {
                    const providedApiRef = `api:${providedApi}`
                    emit(
                        processingResult.relation({
                            type: RELATION_PROVIDES_API,
                            source: getCompoundEntityRef(product),
                            target: parseEntityRef(providedApiRef),
                        } as EntityRelationSpec)
                    );
                    emit(
                        processingResult.relation({
                            type: RELATION_API_PROVIDED_BY,
                            source: parseEntityRef(providedApiRef),
                            target: getCompoundEntityRef(product)
                        } as EntityRelationSpec)
                    );
                }
            }
        } else if (isCustomerOrganisationType(entity)) {
            const group: GroupEntity = entity as GroupEntity;
            this.logger.info(`Processing consumerOrg(${group.metadata.id})`)
            try {
                let organisationId = entity.metadata.annotations![ANNOTATION_APIC_ORGNAME];
                let catalogId = entity.metadata.annotations![ANNOTATION_APIC_CATALOGNAME];
                const applications = await fetchApplications(
                    this.providerConfig,
                    this.logger,
                    this.cache,
                    organisationId,
                    catalogId,
                    Some(entity.metadata.name)
                );
                for (const application of applications) {
                    emit(processingResult.entity(location, withLocations(this.providerConfig.baseUrl, application)))
                }
                let orgAsList = [entity as GroupEntity];
                connectComponentToOrganisationsAndProducts(applications, orgAsList);
                const subscriptions = await fetchSubscriptions(
                    this.providerConfig,
                    this.logger,
                    organisationId, catalogId
                );
                connectComponentToOrganisationsAndProducts(subscriptions, orgAsList);
                connectSubscriptionsToApplications(subscriptions, applications);
                for (const subscription of subscriptions) {
                    emit(processingResult.entity(location, withLocations(this.providerConfig.baseUrl, subscription)))
                }

                const credentials = await fetchApplicationCredentials(
                    this.providerConfig,
                    this.logger,
                    organisationId,
                    catalogId,
                    Some(applications),
                );
                connectComponentToOrganisationsAndProducts(credentials, orgAsList);
                for (const credential of credentials) {
                    emit(processingResult.entity(location, withLocations(this.providerConfig.baseUrl, credential)))
                }
            } catch (e) {
                this.logger.error(e)
            }
        }
        return entity;
    }


}