import { createPermission } from '@backstage/plugin-permission-common';

export const clusterExplorerReadPermission = createPermission({
    name: 'cluster.explorer.read',
    attributes: { action: 'read'},
});

export const clusterExplorerPublicEnvironmentPermission = createPermission({
    name: 'cluster.explorer.public.environment.read',
    attributes: { action: 'read'},
});

export const clusterExplorerPermissions = [clusterExplorerReadPermission, clusterExplorerPublicEnvironmentPermission]