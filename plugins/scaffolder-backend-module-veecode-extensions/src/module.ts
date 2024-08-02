import { createBackendModule } from "@backstage/backend-plugin-api"
import { scaffolderActionsExtensionPoint } from "@backstage/plugin-scaffolder-node/dist/alpha"
import * as backendModuleActions from './actions';

export const scaffolderModuleVeecodeExtensions = createBackendModule({
    pluginId: 'scaffolder',
    moduleId: 'veecode-extensions',
    register(env){
        env.registerInit({
            deps: {
                scaffolder: scaffolderActionsExtensionPoint
            },
            async init({scaffolder}){
                scaffolder.addActions(
                    backendModuleActions.createFileAction(),
                    backendModuleActions.parseJsonAction()
                );
            }
        })
    }
})