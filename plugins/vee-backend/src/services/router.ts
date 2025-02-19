import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { AssistantAIOptions } from '../utils/types';
import { AnalyzerAIController, ScaffolderAIController } from '../controllers';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { GitController } from '../controllers/GitController';
import compression from 'compression';
import { veePermissions } from '@veecode-platform/backstage-plugin-vee-common';

export async function createRouter(
  options: AssistantAIOptions,
): Promise<express.Router> {
  const { logger, config, httpAuth, permissions } = options;

  const analyzerAIController = new AnalyzerAIController(httpAuth, permissions,config,logger);
  const scaffolderAIController = new ScaffolderAIController(httpAuth, permissions,config,logger);
  const gitController = new GitController(httpAuth, permissions,config,logger);

  const router = Router();

  const shouldCompress: compression.CompressionFilter = (req, res) => {
    if (req.headers && typeof req.headers === 'object' && 'x-no-compression' in req.headers) {
      return false;
    }
    return compression.filter(req, res);
  };
  
  
  router.use(compression({ threshold: 1024, filter: shouldCompress }) as unknown as RequestHandler);
  router.use(express.json({ limit: '50mb' }));
  router.use(express.urlencoded({ limit: '50mb', extended: true }));

  router.use(
    createPermissionIntegrationRouter({
      permissions: Object.values(veePermissions)
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