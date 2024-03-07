/* eslint-disable @backstage/no-undeclared-imports */
/* eslint-disable no-restricted-imports */
import React, { useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { EntityRefLinks, catalogApiRef, getEntityRelations, getEntitySourceLocation, useEntity } from '@backstage/plugin-catalog-react';
import { alertApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import { IconButton, makeStyles } from '@material-ui/core';
import { scmIntegrationsApiRef } from '@backstage/integration-react';
import { ANNOTATION_EDIT_URL, ANNOTATION_LOCATION, RELATION_OWNED_BY, stringifyEntityRef } from '@backstage/catalog-model';
import { GitHubIcon, Link } from '@backstage/core-components';
import CachedIcon from '@material-ui/icons/Cached';
import EditIcon from '@material-ui/icons/Edit';
import CodeIcon from '@material-ui/icons/Code';
import { Label, Value } from './fields';

const useStyles = makeStyles(theme => ({
    headerTitle: {
     fontWeight: Number(theme.typography.fontWeightBold),
    },
    headerIcons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}));


export const OverviewPage = () => {

    const { entity } = useEntity();
    const scmIntegrationsApi = useApi(scmIntegrationsApiRef);
    const catalogApi = useApi(catalogApiRef);
    const alertApi = useApi(alertApiRef);
    const errorApi = useApi(errorApiRef);
    const classes = useStyles();

    const entitySourceLocation = getEntitySourceLocation(
        entity,
        scmIntegrationsApi,
    );

    const entityMetadataEditUrl =
        entity.metadata.annotations?.[ANNOTATION_EDIT_URL];

    const entityLocation = entity.metadata.annotations?.[ANNOTATION_LOCATION];

    const ownedByRelations = getEntityRelations(entity, RELATION_OWNED_BY);

    const allowRefresh =
        entityLocation?.startsWith('url:') || entityLocation?.startsWith('file:');
    const refreshEntity = useCallback(async () => {
        try {
            await catalogApi.refreshEntity(stringifyEntityRef(entity));
            alertApi.post({
                message: 'Refresh scheduled',
                severity: 'info',
                display: 'transient',
            });
        } catch (e) {
            errorApi.post(e as any);
        }
    }, [catalogApi, alertApi, errorApi, entity]);



    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.headerTitle}>
                            <h1>About</h1>
                        </TableCell>
                        <TableCell className={classes.headerIcons}>
                            <div>
                                <IconButton
                                    component={Link}
                                    aria-label="View Source"
                                    disabled={!entitySourceLocation?.locationTargetUrl}
                                    title="View Source"
                                    to={entitySourceLocation?.locationTargetUrl ?? '#'}
                                >
                                    {entitySourceLocation?.locationTargetUrl.includes("github") ? (<GitHubIcon />):(<CodeIcon />)}
                                </IconButton>
                                {allowRefresh && (
                                    <IconButton
                                        aria-label="Refresh"
                                        title="Schedule entity refresh"
                                        onClick={refreshEntity}
                                    >
                                        <CachedIcon />
                                    </IconButton>
                                )}
                                <IconButton
                                    component={Link}
                                    aria-label="Edit"
                                    disabled={!entityMetadataEditUrl}
                                    title="Edit Metadata"
                                    to={entityMetadataEditUrl ?? '#'}
                                >
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Kind */}
                    <TableRow>
                        <TableCell>
                            <Label title="Kind"/>
                        </TableCell>
                        <TableCell>
                            <Value content={entity.kind}/>
                        </TableCell>
                    </TableRow>
                    {/* Name */}
                    <TableRow>
                        <TableCell>
                            <Label title="Name"/>
                        </TableCell>
                        <TableCell>
                            <Value content={entity.metadata.name}/>
                        </TableCell>
                    </TableRow>
                    {/* Description */}
                    <TableRow>
                        <TableCell>
                            <Label title="Description"/>
                        </TableCell>
                        <TableCell>
                            <Value content={entity.metadata.name}/>
                        </TableCell>
                    </TableRow>
                    {/* Type */}
                    <TableRow>
                        <TableCell>
                            <Label title="Type"/>
                        </TableCell>
                        <TableCell>
                            <Value content={entity.spec?.type as string}/>
                        </TableCell>
                    </TableRow>
                    {/* Owner */}
                    <TableRow>
                        <TableCell>
                            <Label title="Owner" />
                        </TableCell>
                        <TableCell>
                            <Value
                                content={ownedByRelations.length > 0 && (
                                    <EntityRefLinks entityRefs={ownedByRelations} defaultKind="group" />
                                )}
                            />
                        </TableCell>
                    </TableRow>
                    {/* Lifecycle */}
                    <TableRow>
                        <TableCell>
                            <Label title="Lifecycle"/>
                        </TableCell>
                        <TableCell>
                            <Value content={entity.spec?.lifecycle as string}/>
                        </TableCell>
                    </TableRow>

                    {
                        entity.metadata.environment && (
                            Object.entries(entity.metadata.environment).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell>
                                        <Label title={key}/>
                                    </TableCell>
                                    <TableCell>
                                        <Value content={value}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};
