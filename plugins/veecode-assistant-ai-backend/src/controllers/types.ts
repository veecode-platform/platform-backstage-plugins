import { Request, Response } from 'express';

/**
 *  @public
 *  AnalyzerAIController
 */
export interface IAnalyzerAIControler{
    createVectorStore(req: Request, res: Response): Promise<void>;
    analyzeAndStartChat(req: Request, res: Response): Promise<void>;
    deleteChat(req: Request, res: Response): Promise<void>
}

/**
 *  @public
 *  ScaffolderAIController
 */
export interface IScaffolderAIControler{
    uploadTemplateFiles(req: Request, res: Response): Promise<void>;
    startChat(req: Request, res: Response): Promise<void>;
    deleteChat(req: Request, res: Response): Promise<void>
}

/**
 * @public
 *  GitController
 */

export interface IGitController {
    clone(req: Request, res: Response): Promise<void>,
}