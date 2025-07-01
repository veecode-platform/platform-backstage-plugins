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
  NavItemBlueprint,
  PageBlueprint,
} from '@backstage/frontend-plugin-api';
import {
  compatWrapper,
  convertLegacyRouteRef,
} from '@backstage/core-compat-api';
import { rootRouteRef } from '../routes';
import { AssistantAIMenuIcon } from '../assets/assistant-ai-menu-icon';

/** @alpha */
export const VeeNavItem = NavItemBlueprint.make({
  params: {
    icon: AssistantAIMenuIcon,
    routeRef: convertLegacyRouteRef(rootRouteRef),
    title: 'Vee',
  },
});

/** @alpha */
export const VeePage = PageBlueprint.makeWithOverrides({
  config: {
    schema: {
      title: z => z.string().default('vee'),
      subtitle: z =>
        z.string().default('Give superpowers to your projects using AI'),
      pageTitle: z => z.string().default('Vee'),
      width: z => z.number().optional(),
      height: z => z.number().optional(),
    },
  },
  factory(originalFactory) {
    return originalFactory({
      defaultPath: '/vee',
      routeRef: convertLegacyRouteRef(rootRouteRef),
      loader: async () =>
        import('../components/veeDashboard').then(m =>
          compatWrapper(<m.VeeDashboard />),
        ),
    });
  },
});
