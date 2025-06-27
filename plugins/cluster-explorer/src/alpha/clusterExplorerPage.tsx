/* eslint-disable no-restricted-syntax */
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
import React from 'react';
import {
  compatWrapper,
  convertLegacyRouteRef,
} from '@backstage/core-compat-api';
import { PageBlueprint } from '@backstage/frontend-plugin-api';
import { rootRouteRef } from '../routes';

/** @alpha */
export const ClusterExplorerPage = PageBlueprint.makeWithOverrides({
  config: {
    schema: {
      title: z => z.string().default('Clusters'),
      subtitle: z => z.string().default(''),
      pageTitle: z => z.string().default('Cluster Explorer Page'),
      width: z => z.number().optional(),
      height: z => z.number().optional(),
    },
  },
  factory(originalFactory) {
    return originalFactory({
      defaultPath: '/cluster-explorer',
      routeRef: convertLegacyRouteRef(rootRouteRef),
      loader: async () =>
        import('../components/ClusterExplorerPage').then(m =>
          compatWrapper(<m.ClusterExplorerPage />),
        ),
    });
  },
});
