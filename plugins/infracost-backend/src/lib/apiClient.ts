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
    ANNOTATION_SOURCE_LOCATION,
    ApiEntity,
    ComponentEntity,
    DomainEntity, Entity,
    GroupEntity,
    SystemEntity,
    UserEntity,
  } from '@backstage/catalog-model';
  
  import { Err, None, Ok, Option, Result, Some } from '@sniptt/monads';
  import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
  import * as winston from 'winston';
  // import { getRootLogger } from '@backstage/backend-common';
  
  import * as https from 'https';

  import {ANNOTATION_INFRACOST_PROJECT} from './constants';
  import {Logger} from "winston";
  import {CacheService} from "@backstage/backend-plugin-api";
import { InfracostProviderConfig } from './config';
import type { InfracostEntityV1alpha1  as InfracostEntity } from '../model/kind';
import { InfracostFinOps, InfracostResponse } from './types';


export async function safeFetch(
    url: RequestInfo,
    provider: InfracostProviderConfig,
    // fieldsToReturn: Option<string[]> = None,
    logger: winston.Logger,
    init?: RequestInit,
  ) /* Promise<Result<Response, string>> */ {
    // const token = await issueToken(provider);
    // let currentUrl = url;
    // let localInit = init;
    // if (localInit === undefined) {
    //   localInit = {
    //     headers: {},
    //   };
    // }
    // localInit.agent = httpsAgent;
    // localInit.headers = {
    //   'User-Agent': 'backstage-apic-plugin',
    //   // 'X-Ibm-Client-Id': provider.clientId!,
    //   // 'X-Ibm-Client-Secret': provider.clientSecret!,
    //   "Authorization": `Bearer ${token.unwrap()}`,
    //   'X-Ibm-Consumer-Context': 'admin',
    //   "Accept": 'application/json',
    //   "Content-Type": 'application/json',
    //   ...localInit.headers,
    // };
    // if (fieldsToReturn.isSome()) {
    //   currentUrl += `?fields=${fieldsToReturn.unwrap().join(',')}`;
    // }
    // logger.info(`Performing request to '${currentUrl}'`);
    // const response = await fetch(currentUrl, localInit);
    // if (response.ok) {
    //   return Ok(response);
    // } else if(response.status == 401) {
    //   await delay(1000);
    //   logger.warn(`Got 401, retrying...`)
    //   provider.tmpToken = "";
    //   return safeFetch(url, provider, fieldsToReturn, logger)
    // }
    // return Err(`${response.statusText} ${await response.text()}`);
  }
  
  // export async function fetchEstimates(
  //   provider: InfracostProviderConfig,
  //   logger: winston.Logger,
  //   organisationId: string,
  //   catalogId: string,
  // ): Promise<FinOpsEntity[]> {
  //   logger.info(
  //     `Fetching APIs for organisation(${organisationId}) and catalog(${catalogId})...`,
  //   );
  
  //   const url = `${provider.baseUrl}/catalog/default/finops/${catalogId}`;
  
  //   const response = await safeFetch(url, provider, None, logger);
  
  //   if (response.isErr()) {
  //     logger.error(`${APIS_API_PART}: ${response.unwrapErr()}`);
  //     return [];
  //   }
  
  //   const list: APICResponse<APICAPI> = await response.unwrap().json();
  //   const result = list.results.map(api => {
  //     const apiEntity = parseAPI(api);
  //     apiEntity.metadata.namespace = catalogId;
  //     apiEntity.metadata.annotations = {
  //       [ANNOTATION_SOURCE_LOCATION]: api.url,
  //     };
  //     apiEntity.spec.owner = `system:default/${catalogId}`;
  //     apiEntity.spec.system = `default/${catalogId}`;
  //     return apiEntity;
  //   });
  //   for (const api of result) {
  //     if (api.spec.type !== undefined && api.spec.type.startsWith('openapi')) {
  //       try {
  //         const docsUrl = api.metadata.annotations![ANNOTATION_SOURCE_LOCATION];
  //         const docResponse = await safeFetch(
  //           `${docsUrl}/document`,
  //           provider,
  //           None,
  //           logger,
  //         );
  //         if (docResponse.ok()) {
  //           api.spec.definition = await docResponse.unwrap().text();
  //         }
  //       } catch (e) {
  //         logger.warn(
  //           `Received error while fetching API spec for api(${api.metadata.id})`,
  //         );
  //       }
  //     }
  //   }
  //   return result;
  // }


  export async function fetchInfracostProjectsEstimate(
    provider: InfracostProviderConfig,
    logger: winston.Logger,
  ): Promise<InfracostEntity[]> {
    logger.info(
      `Fetching Infracost Projects Estimate...`,
    );
  
    const url = provider.baseUrl;
  
    const response = await safeFetch(url, provider, /* None ,*/ logger);

    return []
  
    // if (response.isErr()) {
    //   logger.error(response.unwrapErr());
    //   return [];
    // }
  
    // const list: InfracostResponse<InfracostFinOps> = await response.unwrap().json();
    // const result = list.results.map(entity => {
    //   entity.metadata.namespace = catalogId;
    //   entity.metadata.annotations = {
    //     [ANNOTATION_SOURCE_LOCATION]: api.url,
    //   };
    //   apiEntity.spec.owner = `system:default/${catalogId}`;
    //   apiEntity.spec.system = `default/${catalogId}`;
    //   return apiEntity;
    // });
    // for (const api of result) {
    //   if (api.spec.type !== undefined && api.spec.type.startsWith('openapi')) {
    //     try {
    //       const docsUrl = api.metadata.annotations![ANNOTATION_SOURCE_LOCATION];
    //       const docResponse = await safeFetch(
    //         `${docsUrl}/document`,
    //         provider,
    //         None,
    //         logger,
    //       );
    //       if (docResponse.ok()) {
    //         api.spec.definition = await docResponse.unwrap().text();
    //       }
    //     } catch (e) {
    //       logger.warn(
    //         `Received error while fetching API spec for api(${api.metadata.id})`,
    //       );
    //     }
    //   }
    // }
    // return result;
  }


  
