import {
    Entity,
    RELATION_OWNED_BY,
    RELATION_PART_OF,
  } from '@backstage/catalog-model';
  import {
    CodeSnippet,
    Table,
    TableColumn,
    TableProps,
    WarningPanel,
  } from '@backstage/core-components';
  import {
    getEntityRelations,
    humanizeEntityRef,
    useEntityList,
    useStarredEntities,
  } from '@backstage/plugin-catalog-react';
  import { Typography } from '@material-ui/core';
  import { withStyles } from '@material-ui/core/styles';
  import Star from '@material-ui/icons/Star';
  import StarBorder from '@material-ui/icons/StarBorder';
  import { capitalize } from 'lodash';
  import React, { ReactNode, useMemo } from 'react';
  import { columnFactories } from './columns';
  import { CatalogTableRow } from './types';
  import pluralize from "pluralize";
  
  /**
   * Props for {@link CatalogTable}.
   *
   * @public
   */
  export interface CatalogTableProps {
    columns?: TableColumn<CatalogTableRow>[];
    actions?: TableProps<CatalogTableRow>['actions'];
    tableOptions?: TableProps<CatalogTableRow>['options'];
    emptyContent?: ReactNode;
    subtitle?: string;
  }
  
  const YellowStar = withStyles({
    root: {
      color: '#f3ba37',
    },
  })(Star);
  
  const refCompare = (a: Entity, b: Entity) => {
    const toRef = (entity: Entity) =>
      entity.metadata.title ||
      humanizeEntityRef(entity, {
        defaultKind: 'Component',
      });
  
    return toRef(a).localeCompare(toRef(b));
  };
  
  /** @public */
  export const CatalogTable = (props: CatalogTableProps) => {
    const { columns, actions, tableOptions, subtitle, emptyContent } = props;
    const { isStarredEntity, toggleStarredEntity } = useStarredEntities();
    const { loading, error, entities, filters } = useEntityList();
  
    const defaultColumns: TableColumn<CatalogTableRow>[] = useMemo(() => {
      return [
        columnFactories.createTitleColumn({ hidden: true }),
        columnFactories.createNameColumn({ defaultKind: filters.kind?.value }),
        ...createEntitySpecificColumns(),
        columnFactories.createTagsColumn(),
      ];
  
      function createEntitySpecificColumns(): TableColumn<CatalogTableRow>[] {
        const baseColumns = [
          columnFactories.createOwnerColumn(),
          columnFactories.createSpecTypeColumn(),
          columnFactories.createSpecLifecycleColumn(),
        ];
        switch (filters.kind?.value) {
          case 'user':
            return [];
          case 'domain':
          case 'system':
            return [columnFactories.createOwnerColumn()];
          case 'group':
          case 'template':
            return [columnFactories.createSpecTypeColumn()];
          case 'location':
            return [
              columnFactories.createSpecTypeColumn(),
              columnFactories.createSpecTargetsColumn(),
            ];
          case 'api':
            return [...baseColumns, columnFactories.createPublishedAtColumn()];
          default:
            return entities.every(
              entity => entity.metadata.namespace === 'default',
            )
              ? baseColumns
              : [...baseColumns, columnFactories.createNamespaceColumn()];
        }
      }
    }, [filters.kind?.value, entities]);
  
    const showTypeColumn = filters.type === undefined;
    // TODO(timbonicus): remove the title from the CatalogTable once using EntitySearchBar
    const titlePreamble = capitalize(filters.user?.value ?? 'all');
  
    if (error) {
      return (
        <div>
          <WarningPanel
            severity="error"
            title="Could not fetch catalog entities."
          >
            <CodeSnippet language="text" text={error.toString()} />
          </WarningPanel>
        </div>
      );
    }
  
    const defaultActions: TableProps<CatalogTableRow>['actions'] = [
      ({ entity }) => {
        const isStarred = isStarredEntity(entity);
        const title = isStarred ? 'Remove from favorites' : 'Add to favorites';
  
        return {
          cellStyle: { paddingLeft: '1em' },
          icon: () => (
            <>
              <Typography variant="srOnly">{title}</Typography>
              {isStarred ? <YellowStar /> : <StarBorder />}
            </>
          ),
          tooltip: title,
          onClick: () => toggleStarredEntity(entity),
        };
      },
    ];
  
    const rows = entities.sort(refCompare).map(entity => {
      const partOfSystemRelations = getEntityRelations(entity, RELATION_PART_OF, {
        kind: 'system',
      });
      const ownedByRelations = getEntityRelations(entity, RELATION_OWNED_BY);
  
      return {
        entity,
        resolved: {
          name: humanizeEntityRef(entity, {
            defaultKind: 'Component',
          }),
          ownedByRelationsTitle: ownedByRelations
            .map(r => humanizeEntityRef(r, { defaultKind: 'group' }))
            .join(', '),
          ownedByRelations,
          partOfSystemRelationTitle: partOfSystemRelations
            .map(r =>
              humanizeEntityRef(r, {
                defaultKind: 'system',
              }),
            )
            .join(', '),
          partOfSystemRelations,
        },
      };
    });
  
    const typeColumn = (columns || defaultColumns).find(c => c.title === 'Type');
    if (typeColumn) {
      typeColumn.hidden = !showTypeColumn;
    }
    const showPagination = rows.length > 20;
    const currentKind = filters.kind?.value || '';
    const currentType = filters.type?.value || '';
    const titleDisplay = [titlePreamble, currentType, pluralize(currentKind)]
      .filter(s => s)
      .join(' ');
  
    return (
      <Table<CatalogTableRow>
        isLoading={loading}
        columns={columns || defaultColumns}
        options={{
          paging: showPagination,
          pageSize: 20,
          actionsColumnIndex: -1,
          loadingType: 'linear',
          showEmptyDataSourceMessage: !loading,
          padding: 'dense',
          pageSizeOptions: [20, 50, 100],
          ...tableOptions,
        }}
        title={`${titleDisplay} (${entities.length})`}
        data={rows}
        actions={actions || defaultActions}
        subtitle={subtitle}
        emptyContent={emptyContent}
      />
    );
  };
  
  CatalogTable.columns = columnFactories;