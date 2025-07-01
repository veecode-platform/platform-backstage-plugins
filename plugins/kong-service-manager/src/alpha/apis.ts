/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  configApiRef,
  ApiBlueprint,
  createApiFactory,
  fetchApiRef,
} from '@backstage/frontend-plugin-api';
import { kongServiceManagerApiRef, KongServiceManagerApiClient } from '../api';
import {
  scmAuthApiRef,
  scmIntegrationsApiRef,
} from '@backstage/integration-react';

/**
 * @alpha
 */
export const kongServiceManagerApi = ApiBlueprint.make({
  params: {
    factory: createApiFactory({
      api: kongServiceManagerApiRef,
      deps: {
        config: configApiRef,
        fetchApi: fetchApiRef,
        scmAuthApi: scmAuthApiRef,
        scmIntegrationsApi: scmIntegrationsApiRef,
      },
      factory: ({ config, fetchApi, scmAuthApi, scmIntegrationsApi }) =>
        new KongServiceManagerApiClient({
          config,
          fetchApi,
          scmAuthApi,
          scmIntegrationsApi,
        }),
    }),
  },
});
