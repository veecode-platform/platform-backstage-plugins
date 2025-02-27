import { createPermission } from '@backstage/plugin-permission-common';

/**
 * permissions
 * @public
 */

export const veeReadPermission = createPermission({
    name: 'vee.ai.read',
    attributes: { action: 'read'}
});

export const veeReadStacks = createPermission({
    name: 'vee.ai.read.stacks',
    attributes: { action: 'read' }
})

export const veeCreateStack = createPermission({
    name: 'vee.ai.create.stack',
    attributes: { action: 'create' }
})

export const veeEditStack = createPermission({
    name: 'vee.ai.edit.stack',
    attributes: { action: 'update' }
})

export const veeRemoveStack = createPermission({
    name: 'vee.ai.remove.stack',
    attributes: { action: 'delete' }
})

export const veeReadPlugins = createPermission({
    name: 'vee.ai.read.plugins',
    attributes: { action: 'read'}
})

export const veeAddPlugin = createPermission({
    name: 'vee.ai.add.plugin',
    attributes: { action: 'create'}
})

export const veeEditPlugin = createPermission({
    name: 'vee.ai.edit.plugin',
    attributes: { action: 'update' }
})

export const veeRemovePlugin = createPermission({
    name: 'vee.ai.remove.plugin',
    attributes: { action: 'delete'}
})

export const veeAnalyzerReadPermission = createPermission({
    name: 'vee.ai.analyzer.read',
    attributes: { action: 'read'}
});

export const veeAnalyzerSaveChangesInRepo = createPermission({
    name: 'vee.ai.analyzer.save.changes',
    attributes: { action: 'update' }
});

export const veeSaveTemplate = createPermission({
    name: 'vee.ai.save.template',
    attributes: { action: 'create' }
})

export const veePermissions = {
    veeReadPermission,
    veeReadStacks,
    veeCreateStack,
    veeEditStack,
    veeRemoveStack,
    veeReadPlugins,
    veeAddPlugin,
    veeEditPlugin,
    veeRemovePlugin,
    veeAnalyzerReadPermission,
    veeAnalyzerSaveChangesInRepo,
    veeSaveTemplate
}