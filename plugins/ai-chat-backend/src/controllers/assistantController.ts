import { Request, Response } from 'express';
import { OpenAIController } from "./openAIController";
import { IAssistantController } from './types';
import { InputError, stringifyError } from '@backstage/errors';

export class AssistantController extends OpenAIController implements IAssistantController{

    async startChat(req:Request, res: Response){
        try {
            const response = await this.openAIApi.startChat();
            res.status(200).json(response);
          } catch (error:any) {
            if (error.errors) {
                throw new InputError(
                  `Error to start chat: ${stringifyError(error.errors)}`,
                );
              }
              throw error;
          }
    }

    async chat(req: Request, res: Response){
        const { message, threadId, templateContent } = req.body;

    if (!threadId) {
      res.status(400).json({ error: 'ThreadId is required' });
    }

    try {
      const response = await this.openAIApi.getChat(threadId, message,templateContent);
      res.status(200).json({ content: response });
    } catch (error:any) {
        if (error.errors) {
            throw new InputError(
              `Error to get chat: ${stringifyError(error.errors)}`,
            );
          }
          throw error;
      }
    }
}