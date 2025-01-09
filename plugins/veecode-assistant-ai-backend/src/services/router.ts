import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { AssistantAIOptions } from '../utils/types';
import { AnalyzerAIController, ScaffolderAIController } from '../controllers';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { veecodeAssistantAIPermissions } from '@veecode-platform/backstage-plugin-veecode-assistant-ai-common';
import { GitController } from '../controllers/GitController';
import compression from 'compression';

export async function createRouter(
  options: AssistantAIOptions,
): Promise<express.Router> {
  const { logger, config, httpAuth, permissions } = options;

  const analyzerAIController = new AnalyzerAIController(httpAuth, permissions,config,logger);
  const scaffolderAIController = new ScaffolderAIController(httpAuth, permissions,config,logger);
  const gitController = new GitController(httpAuth, permissions,config,logger);

  const router = Router();

  router.use(
    compression({
      threshold: 1024, 
      filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
      },
    }),
  );

  router.use(express.json({ limit: '50mb' }));
  router.use(express.urlencoded({ limit: '50mb', extended: true }));

  router.use(
    createPermissionIntegrationRouter({
      permissions: Object.values(veecodeAssistantAIPermissions)
    })
  );

  router.post("/submit-repo", analyzerAIController.createVectorStore as RequestHandler);
  router.post("/chat-analyze-repo", analyzerAIController.analyzeAndStartChat as RequestHandler);
  router.delete("/chat-analyze-repo", analyzerAIController.deleteChat as RequestHandler);
  router.post("/clone-repository", gitController.clone as RequestHandler);
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