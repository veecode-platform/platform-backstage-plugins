import { Request, Response } from 'express';

export interface IAssistantController {
  startChat(req: Request, res: Response): Promise<void>
}