import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { OpenAIOptions } from '../utils/types';
import { OpenAIApi } from '../api';
import { AnalyzerAIController, ScaffolderAIController } from '../controllers';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { veecodeAssistantAIPermissions } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';


export async function createRouter(
  options: OpenAIOptions,
): Promise<express.Router> {
  const { logger, config } = options;
  
  const openAIApi = new OpenAIApi(options.config,options.logger);
  const analyzerAIController = new AnalyzerAIController(openAIApi, options.httpAuth, options.permissions);
  const scaffolderAIController = new ScaffolderAIController(openAIApi, options.httpAuth, options.permissions);
  
  const router = Router();
  router.use(express.json());

  router.use(
    createPermissionIntegrationRouter({
      permissions: Object.values(veecodeAssistantAIPermissions)
    })
  );

  router.post("/upload-repo", analyzerAIController.uploadFiles as RequestHandler);
  router.post("/chat-analyze-repo", analyzerAIController.analyzeAndStartChat as RequestHandler);
  router.delete("/chat-analyze", analyzerAIController.deleteChat as RequestHandler);
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