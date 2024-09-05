import { createPermission } from '@backstage/plugin-permission-common';

export const infracostReadPermission = createPermission({
    name: 'infracost.read',
    attributes: { action: 'read'},
});

export const infracostCreatePermission = createPermission({
    name: 'infracost.create',
    attributes: { action: 'create'},
});

export const infracostUpdatePermission = createPermission({
    name: 'infracost.update',
    attributes: { action: 'update'},
});

export const infracostDeletePermission = createPermission({
    name: 'infracost.delete',
    attributes: { action: 'delete'},
});


export const infracostPermissions = [infracostReadPermission, infracostCreatePermission, infracostUpdatePermission, infracostDeletePermission]