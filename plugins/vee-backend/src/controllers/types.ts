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
    createVectorStore(req: Request, res: Response): Promise<void>;
    analyzeAndStartChat(req: Request, res: Response): Promise<void>;
    deleteChat(req: Request, res: Response): Promise<void>
}

/**
 * @public
 *  GitController
 */

export interface IGitController {
    clone(req: Request, res: Response): Promise<void>,
}

/**
 *  @public
 *  FixedOptionsController
 */
export interface IFixedOptionsController {
    ListAllFixedOptions: (req: Request, resp: Response) => Promise<void>;
    getFixedOptionsById: (req: Request, resp: Response) => Promise<void>;
    createFixedOptions: (req: Request, resp: Response) => Promise<void>;
    editFixedOptions: (req: Request, resp: Response) => Promise<void>;
    deleteFixedOptions: (req: Request, resp: Response) => Promise<void>
}

/**
 *  @public
 *  StackController
 */
export interface IStackController {
    ListAllStacks: (req: Request, resp: Response) => Promise<void>;
    getStackById: (req: Request, resp: Response) => Promise<void>;
    createStack: (req: Request, resp: Response) => Promise<void>;
    editStack: (req: Request, resp: Response) => Promise<void>;
    deleteStack: (req: Request, resp: Response) => Promise<void>
}

/**
 *  @public
 *  PluginsController
 */
export interface IPluginsController {
    ListAllPlugins: (req: Request, resp: Response) => Promise<void>;
    getPluginById: (req: Request, resp: Response) => Promise<void>;
    addPlugin: (req: Request, resp: Response) => Promise<void>;
    editPlugin: (req: Request, resp: Response) => Promise<void>;
    deleteStack: (req: Request, resp: Response) => Promise<void>
}
