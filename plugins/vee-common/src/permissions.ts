import { createPermission } from '@backstage/plugin-permission-common';

/**
 * general permissions
 * @public
 */
export const veeReadPermission = createPermission({
    name: 'vee.ai.read',
    attributes: { action: 'read'}
});

export const veeAccessSettingsPanelPermission = createPermission({
    name: 'vee.ai.access.settings.panel',
    attributes: { action: 'read' }
});

export const veeAnalyzerReadPermission = createPermission({
    name: 'vee.ai.analyzer.read',
    attributes: { action: 'read'}
});

export const veeManageStacksPermission = createPermission({
    name: 'vee.ai.manage.stack.read',
    attributes: { action: 'read'}
});

export const veeManagePluginsPermission = createPermission({
    name: 'vee.ai.manage.plugins.read',
    attributes: { action: 'read'}
});

export const veeManageFixedOptionsPermission = createPermission({
    name: 'vee.ai.manage.fixed.options.read',
    attributes: { action: 'read'}
});


export const veeAnalyzerSaveChangesInRepoPermission = createPermission({
    name: 'vee.ai.analyzer.save.changes',
    attributes: { action: 'update' }
});

export const veeGenerateTemplatePermission = createPermission({
    name: 'vee.ai.generate.template',
    attributes: { action: 'create' }
});

export const veeSaveTemplatePermission = createPermission({
    name: 'vee.ai.save.template',
    attributes: { action: 'create' }
});


/**
 * granular permissions
 * @public
 */


export const veeCreateFixedOptionsPermission = createPermission({
    name: 'vee.ai.create.fixed.options',
    attributes: { action: 'create'}
});

export const veeEditFixedOptionsPermission = createPermission({
    name: 'vee.ai.edit.fixed.options',
    attributes: { action: 'update' }
});

export const veeRemoveFixedOptionsPermission = createPermission({
    name: 'vee.ai.remove.fixed.options',
    attributes: { action: 'delete'}
});

export const veeReadStacksPermission = createPermission({
    name: 'vee.ai.read.stacks',
    attributes: { action: 'read' }
})

export const veeCreateStackPermission = createPermission({
    name: 'vee.ai.create.stack',
    attributes: { action: 'create' }
})

export const veeEditStackPermission = createPermission({
    name: 'vee.ai.edit.stack',
    attributes: { action: 'update' }
})

export const veeRemoveStackPermission = createPermission({
    name: 'vee.ai.remove.stack',
    attributes: { action: 'delete' }
})

export const veeReadPluginsPermission = createPermission({
    name: 'vee.ai.read.plugins',
    attributes: { action: 'read'}
})

export const veeAddPluginPermission = createPermission({
    name: 'vee.ai.add.plugin',
    attributes: { action: 'create'}
})

export const veeEditPluginPermission = createPermission({
    name: 'vee.ai.edit.plugin',
    attributes: { action: 'update' }
})

export const veeRemovePluginPermission = createPermission({
    name: 'vee.ai.remove.plugin',
    attributes: { action: 'delete'}
})

export const veePermissions = {
    veeReadPermission,
    veeManageStacksPermission,
    veeManagePluginsPermission,
    veeManageFixedOptionsPermission,
    veeAccessSettingsPanelPermission,
    veeCreateFixedOptionsPermission,
    veeEditFixedOptionsPermission,
    veeRemoveFixedOptionsPermission,
    veeReadStacksPermission,
    veeCreateStackPermission,
    veeEditStackPermission,
    veeRemoveStackPermission,
    veeReadPluginsPermission,
    veeAddPluginPermission,
    veeEditPluginPermission,
    veeRemovePluginPermission,
    veeAnalyzerReadPermission,
    veeAnalyzerSaveChangesInRepoPermission,
    veeGenerateTemplatePermission,
    veeSaveTemplatePermission
}