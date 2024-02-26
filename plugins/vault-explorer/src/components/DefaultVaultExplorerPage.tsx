/*
 * Copyright 2021 The Backstage Authors
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
    Content,
    ContentHeader,
    CreateButton,
    PageWithHeader,
    TableColumn,
    TableProps,
  } from '@backstage/core-components';
  import { configApiRef, useApi } from '@backstage/core-plugin-api';
  import { CatalogTable, CatalogTableRow } from './Table';
  import {
    EntityKindPicker,
    EntityLifecyclePicker,
    EntityListProvider,
    EntityOwnerPicker,
    EntityTagPicker,
    EntityTypePicker,
    UserListFilterKind,
    UserListPicker,
    CatalogFilterLayout,
  } from '@backstage/plugin-catalog-react';
  import React from 'react';
  
  const defaultColumns: TableColumn<CatalogTableRow>[] = [
    CatalogTable.columns.createTitleColumn({ hidden: true }),
    CatalogTable.columns.createNameColumn({ defaultKind: 'Vault' }),
    CatalogTable.columns.createOwnerColumn(),
    CatalogTable.columns.createSpecTypeColumn(),
    CatalogTable.columns.createSpecLifecycleColumn(),
  ];
  
  /**
   * DefaultVaultExplorerPageProps
   * @public
   */
  export type DefaultVaultExplorerPageProps = {
    initiallySelectedFilter?: UserListFilterKind;
    columns?: TableColumn<CatalogTableRow>[];
    actions?: TableProps<CatalogTableRow>['actions'];
  };
  
  /**
   * DefaultVaultExplorerPage
   * @public
   */
  export const DefaultVaultExplorerPage = (props: DefaultVaultExplorerPageProps) => {
    const { initiallySelectedFilter = 'all', columns, actions } = props;
  
    const configApi = useApi(configApiRef);
    const generatedSubtitle = `${
      configApi.getOptionalString('organization.name') ?? 'Devportal'
    } Vault Explorer`;
    const registerComponentLink = "/catalog-import"
  
    return (
      <PageWithHeader
        themeId="tool"
        title="Vault"
        subtitle={generatedSubtitle}
        pageTitleOverride="Vault"
      >
        <Content>
          <ContentHeader title="">
            <CreateButton
              title="Register Existing Vault"
              to={registerComponentLink}
            />
          </ContentHeader>
          <EntityListProvider>
            <CatalogFilterLayout>
              <CatalogFilterLayout.Filters>
                <EntityKindPicker initialFilter="vault" hidden />
                <EntityTypePicker />
                <UserListPicker initialFilter={initiallySelectedFilter} />
                <EntityOwnerPicker />
                <EntityLifecyclePicker />
                <EntityTagPicker />
              </CatalogFilterLayout.Filters>
              <CatalogFilterLayout.Content>
                <CatalogTable
                  columns={columns || defaultColumns}
                  actions={actions}
                />
              </CatalogFilterLayout.Content>
            </CatalogFilterLayout>
          </EntityListProvider>
        </Content>
      </PageWithHeader>
    );
  };