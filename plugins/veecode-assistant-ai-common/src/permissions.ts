import { createPermission } from '@backstage/plugin-permission-common';

/**
 * permissions
 * @public
 */

export const veecodeAssistantAIReadPermission = createPermission({
    name: 'assistant.ai.read',
    attributes: { action: 'read'}
});


export const veecodeAssistantAIAutoScaffReadPermission = createPermission({
    name: 'assistant.ai.auto.scaff.read',
    attributes: { action: 'read'}
});

export const veecodeAssistantAIAnalyzerReadPermission = createPermission({
    name: 'assistant.ai.analyzer.read',
    attributes: { action: 'read'}
});