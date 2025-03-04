import { Request, Response } from 'express';

export interface IServiceController {
    getServiceInfo: (req:Request, res: Response) => void;
    getAssociatedPlugins: (req:Request, res:Response) => void,
    addPluginToService: (req:Request, res:Response) => void,
    editServicePlugin: (req:Request, res:Response) => void,
    removeServicePlugin : (req:Request, res:Response) => void,
}
export interface IRoutesController {
    getRoutes: (req:Request, res:Response) => void,
    routeById: (req:Request, res:Response) => void,
    createRoute: (req:Request, res:Response) => void,
    editRoute: (req:Request, res:Response) => void,
    removeRoute: (req:Request, res:Response) => void,
    getRouteAssociatedPlugins: (req: Request, res: Response) => Promise<void>,
    addPluginToRoute: (req: Request, res: Response) => Promise<void>,
    editRoutePlugin: (req: Request, res: Response) => Promise<void>,
    removeRoutePlugin: (req: Request, res: Response) => Promise<void>
  }

export interface IPluginsController {
    getEnabledPlugins: (req:Request, res:Response) => void,
    getPluginFields: (req:Request, res:Response) => void,   
}


