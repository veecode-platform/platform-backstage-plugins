import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { AssistantAIOptions } from '../utils/types';
import { AnalyzerAIController, FixedOptionsController, PluginsController, ScaffolderAIController, StackController } from '../controllers';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { GitController } from '../controllers/GitController';
import compression from 'compression';
import { veePermissions } from '@veecode-platform/backstage-plugin-vee-common';

export async function createRouter(
  options: AssistantAIOptions,
): Promise<express.Router> {
  const { logger, config, httpAuth, permissions, database } = options;

  const analyzerAIController = new AnalyzerAIController(httpAuth, permissions,config,logger,database);
  const scaffolderAIController = new ScaffolderAIController(httpAuth, permissions,config,logger,database);
  const gitController = new GitController(httpAuth, permissions,config,logger, database);
  const fixedOptionsController = new FixedOptionsController(httpAuth, permissions,config,logger, database);
  const stackController = new StackController(httpAuth, permissions,config,logger, database);
  const pluginsController = new PluginsController(httpAuth, permissions,config,logger, database);

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
  router.post("/partial-clone-repository", gitController.partialClone as RequestHandler);

  router.post("/submit-template",scaffolderAIController.createVectorStore as RequestHandler )
  router.post("/chat-template", scaffolderAIController.analyzeAndStartChat as RequestHandler);
  router.delete("/chat-template", scaffolderAIController.deleteChat as RequestHandler);

  router.get("/fixedOptions", fixedOptionsController.ListAllFixedOptions as RequestHandler);
  router.get("/fixedOptions/:fixedOptionsId", fixedOptionsController.getFixedOptionsById as RequestHandler);
  router.post("/fixedOptions", fixedOptionsController.createFixedOptions as RequestHandler);
  router.patch("/fixedOptions/:fixedOptionsId", fixedOptionsController.editFixedOptions as RequestHandler);
  router.delete("/fixedOptions/:fixedOptionsId", fixedOptionsController.deleteFixedOptions as RequestHandler);
  router.get("/stacks", stackController.ListAllStacks as RequestHandler);
  router.get("/stacks/:stackId", stackController.getStackById as RequestHandler);
  router.post("/stacks", stackController.createStack as RequestHandler);
  router.patch("/stacks/:stackId", stackController.editStack as RequestHandler);
  router.delete("/stacks/:stackId", stackController.deleteStack as RequestHandler);
  router.get("/plugins", pluginsController.ListAllPlugins as RequestHandler);
  router.get("/plugins/:pluginId", pluginsController.getPluginById as RequestHandler);
  router.post("/plugins", pluginsController.addPlugin as RequestHandler);
  router.patch("/plugins/:pluginId", pluginsController.editPlugin as RequestHandler);
  router.delete("/plugins/:pluginId", pluginsController.deleteStack as RequestHandler);

    router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });
  router.use(middleware.error());
  return router;
}