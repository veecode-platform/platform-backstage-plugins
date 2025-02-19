import { createPermission } from '@backstage/plugin-permission-common';

/**
 * permissions
 * @public
 */

export const veeReadPermission = createPermission({
    name: 'vee.ai.read',
    attributes: { action: 'read'}
});


export const veeScaffolderReadPermission = createPermission({
    name: 'vee.ai.scaffolder.read',
    attributes: { action: 'read'}
});

export const veeAnalyzerReadPermission = createPermission({
    name: 'vee.ai.analyzer.read',
    attributes: { action: 'read'}
});

export const veeAnalyzerSaveChangesInRepo = createPermission({
    name: 'vee.ai.analyzer.save.changes',
    attributes: { action: 'update' }
});

export const veeScaffolderSaveTemplate = createPermission({
    name: 'vee.ai.scaffolder.save.template',
    attributes: { action: 'create' }
})

export const veePermissions = {
    veeReadPermission,
    veeScaffolderReadPermission,
    veeAnalyzerReadPermission,
    veeAnalyzerSaveChangesInRepo,
    veeScaffolderSaveTemplate
}