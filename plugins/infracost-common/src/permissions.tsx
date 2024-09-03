import { createPermission, BasicPermission } from '@backstage/plugin-permission-common';

export const InfracostReadPermission = createPermission({
    name: 'infracost.read',
    attributes: { action: 'read'},
});

export const InfracostCreatePermission = createPermission({
    name: 'infracost.create',
    attributes: { action: 'create'},
});

export const InfracostUpdatePermission = createPermission({
    name: 'infracost.update',
    attributes: { action: 'update'},
});

export const InfracostDeletePermission = createPermission({
    name: 'infracost.delete',
    attributes: { action: 'delete'},
});


export const InfracostPermissions = [InfracostReadPermission, InfracostCreatePermission, InfracostUpdatePermission, InfracostDeletePermission] as BasicPermission[]