import { createPermission } from '@backstage/plugin-permission-common';

/**
 * permissions
 * @public
 */

export const veecodeAssistantAIReadPermission = createPermission({
    name: 'assistant.ai.read',
    attributes: { action: 'read'}
});


export const veecodeAssistantAIScaffolderReadPermission = createPermission({
    name: 'assistant.ai.scaffolder.read',
    attributes: { action: 'read'}
});

export const veecodeAssistantAIAnalyzerReadPermission = createPermission({
    name: 'assistant.ai.analyzer.read',
    attributes: { action: 'read'}
});

export const veeCodeAssistantAIAnalyzerSaveChangesInRepo = createPermission({
    name: 'assistant.ai.analyzer.save.changes',
    attributes: { action: 'update' }
});

export const veeCodeAssistantAIScaffolderSaveTemplate = createPermission({
    name: 'assistant.ai.scaffolder.save.template',
    attributes: { action: 'create' }
})

export const veecodeAssistantAIPermissions = {
    veecodeAssistantAIReadPermission,
    veecodeAssistantAIScaffolderReadPermission,
    veecodeAssistantAIAnalyzerReadPermission,
    veeCodeAssistantAIAnalyzerSaveChangesInRepo,
    veeCodeAssistantAIScaffolderSaveTemplate
}