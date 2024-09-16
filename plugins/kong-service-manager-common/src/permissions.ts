import { createPermission } from '@backstage/plugin-permission-common';

export const kongServiceManagerReadPermission = createPermission({
    name: 'kong.service.manager.read',
    attributes: { action: 'read'},
});

export const kongServiceManagerCreatePermission = createPermission({
    name: 'kong.service.manager.create',
    attributes: { action: 'create'},
});

export const kongServiceManagerUpdatePermission = createPermission({
    name: 'kong.service.manager.update',
    attributes: { action: 'update'},
});

export const kongServiceManagerDeletePermission = createPermission({
    name: 'kong.service.manager.delete',
    attributes: { action: 'delete'},
});


export const kongServiceManagerPermissions = [ kongServiceManagerReadPermission, kongServiceManagerCreatePermission, kongServiceManagerUpdatePermission, kongServiceManagerDeletePermission ]