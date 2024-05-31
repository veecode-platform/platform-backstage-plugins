import { createPermission } from '@backstage/plugin-permission-common';

export const gitlabPipelinesReadPermission = createPermission({
    name: 'gitlab.pipelines.read',
    attributes: { action: 'read'},
});

export const gitlabPipelinesStartWorkflowPermission = createPermission({
    name: 'gitlab.pipelines.create',
    attributes: { action: 'create'},
});


export const gitlabPipelinesPermissions = [gitlabPipelinesReadPermission, gitlabPipelinesStartWorkflowPermission]