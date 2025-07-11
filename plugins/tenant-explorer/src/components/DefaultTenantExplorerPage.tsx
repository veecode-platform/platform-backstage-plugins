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

const defaultColumns: TableColumn<CatalogTableRow>[] = [
  CatalogTable.columns.createTitleColumn({ hidden: true }),
  CatalogTable.columns.createNameColumn({ defaultKind: 'Tenant' }),
  CatalogTable.columns.createOwnerColumn(),
  CatalogTable.columns.createSpecTypeColumn(),
  CatalogTable.columns.createSpecLifecycleColumn(),
];

/**
 * DefaultTenantExplorerPageProps
 * @public
 */
export type DefaultTenantExplorerPageProps = {
  initiallySelectedFilter?: UserListFilterKind;
  columns?: TableColumn<CatalogTableRow>[];
  actions?: TableProps<CatalogTableRow>['actions'];
};

/**
 * DefaultTenantExplorerPage
 * @public
 */
export const DefaultTenantExplorerPage = (
  props: DefaultTenantExplorerPageProps,
) => {
  const { initiallySelectedFilter = 'all', columns, actions } = props;

  const configApi = useApi(configApiRef);
  const generatedSubtitle = `${
    configApi.getOptionalString('organization.name') ?? 'Devportal'
  } Tenants Explorer`;
  const registerComponentLink = '/catalog-import';

  return (
    <PageWithHeader
      themeId="tool"
      title="Control-plane Tenants"
      subtitle={generatedSubtitle}
      pageTitleOverride="Tennants"
    >
      <Content>
        <ContentHeader title="">
          <CreateButton
            title="Register Existing Tenant"
            to={registerComponentLink}
          />
        </ContentHeader>
        <EntityListProvider>
          <CatalogFilterLayout>
            <CatalogFilterLayout.Filters>
              <EntityKindPicker initialFilter="tenant" hidden />
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
