import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express, { RequestHandler } from 'express';
import Router from 'express-promise-router';
import { OpenAIOptions } from '../utils/types';


export async function createRouter(
  options: OpenAIOptions,
): Promise<express.Router> {
  const { logger, config } = options;
  
  // const openAIApi = new OpenAIApiClient(options);
  // const assistantController = new AssistantController(openAIApi,httpAuth,logger);
  
  const router = Router();
  router.use(express.json());



  // router.post('/start-chat',  assistantController.startChat as RequestHandler);

  // router.post('/chat', assistantController.chat as RequestHandler);

    router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });
  router.use(middleware.error());
  return router;
}