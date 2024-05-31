import { createPermission } from '@backstage/plugin-permission-common';

export const githubWorkflowsReadPermission = createPermission({
    name: 'github.workflows.read',
    attributes: { action: 'read'},
});

export const githubWorkflowsStartWorkflowPermission = createPermission({
    name: 'github.workflows.create',
    attributes: { action: 'create'},
});


export const githubWorkflowsPermissions = [githubWorkflowsReadPermission, githubWorkflowsStartWorkflowPermission]