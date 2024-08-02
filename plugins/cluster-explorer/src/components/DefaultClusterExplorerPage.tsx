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
    CatalogTable.columns.createNameColumn({ defaultKind: 'Cluster' }),
    CatalogTable.columns.createOwnerColumn(),
    CatalogTable.columns.createSpecTypeColumn(),
    CatalogTable.columns.createSpecLifecycleColumn(),
  ];
  
  /**
   * DefaultClusterExplorerPageProps
   * @public
   */
  export type DefaultClusterExplorerPageProps = {
    initiallySelectedFilter?: UserListFilterKind;
    columns?: TableColumn<CatalogTableRow>[];
    actions?: TableProps<CatalogTableRow>['actions'];
  };
  
  /**
   * DefaultClusterExplorerPage
   * @public
   */
  export const DefaultClusterExplorerPage = (props: DefaultClusterExplorerPageProps) => {
    const { initiallySelectedFilter = 'all', columns, actions } = props;
  
    const configApi = useApi(configApiRef);
    const generatedSubtitle = `${
      configApi.getOptionalString('organization.name') ?? 'Devportal'
    } Cluster Explorer`;
    const registerComponentLink = "/catalog-import"
  
    return (
      <PageWithHeader
        themeId="tool"
        title="Clusters"
        subtitle={generatedSubtitle}
        pageTitleOverride="Clusters"
      >
        <Content>
          <ContentHeader title="">
            <CreateButton
              title="Register Existing Cluster"
              to={registerComponentLink}
            />
          </ContentHeader>
          <EntityListProvider>
            <CatalogFilterLayout>
              <CatalogFilterLayout.Filters>
                <EntityKindPicker initialFilter="cluster" hidden />
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