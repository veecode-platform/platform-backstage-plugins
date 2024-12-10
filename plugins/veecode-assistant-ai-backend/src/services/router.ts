import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { AssistantAIOptions } from '../utils/types';
import { AnalyzerAIController, ScaffolderAIController } from '../controllers';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { veecodeAssistantAIPermissions } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';

export async function createRouter(
  options: AssistantAIOptions,
): Promise<express.Router> {
  const { logger, config, httpAuth, permissions } = options;

  const analyzerAIController = new AnalyzerAIController(httpAuth, permissions,config,logger);
  const scaffolderAIController = new ScaffolderAIController(httpAuth, permissions,config,logger);
  
  const router = Router();
  router.use(express.json());

  router.use(
    createPermissionIntegrationRouter({
      permissions: Object.values(veecodeAssistantAIPermissions)
    })
  );

  router.post("/submit-repo", analyzerAIController.donwloadRepoAndCreateVectorStore as RequestHandler);
  router.post("/chat-analyze-repo", analyzerAIController.analyzeAndStartChat as RequestHandler);
  router.delete("/chat-analyze-repo", analyzerAIController.deleteChat as RequestHandler);
  router.post("/save-changes", analyzerAIController.saveChangesInRepository as RequestHandler);
  router.post("/upload-template", scaffolderAIController.uploadTemplateFiles as RequestHandler);
  router.post("/chat-template", scaffolderAIController.startChat as RequestHandler);
  router.delete("/chat-template", scaffolderAIController.deleteChat as RequestHandler);

    router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });
  router.use(middleware.error());
  return router;
}