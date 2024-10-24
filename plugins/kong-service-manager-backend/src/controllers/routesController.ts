import { Request, Response } from 'express';
import { InputError, NotAllowedError, stringifyError } from '@backstage/errors';
import { IRoutesController } from './types';
import { KongController } from './kongController';
import { kongCreateRoutePermission, kongDeleteRoutePermission, kongReadRoutesPermission, kongUpdateRoutePermission } from '@veecode-platform/backstage-plugin-kong-service-manager-common';


export class RoutesController  extends KongController implements IRoutesController{
  
  getRoutes = async (req:Request, res:Response) => {
    const { instanceName, serviceName } = req.params;

    if (!(await this.isRequestAuthorized(req, kongReadRoutesPermission))) {
      throw new NotAllowedError('Unauthorized');
    }

      try{
        const routeList = await this.kongServiceManagerApi
        .getRoutesFromService(
          instanceName,
          serviceName)
        res
        .status(200)
        .json({
          routes: routeList
        })
      }
      catch(err:any){
        if (err.errors) {
          throw new InputError(
            `Unable to fetch route list for ${
              serviceName
            }: ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
  }

  routeById = async(req: Request, res: Response) => {
    const { instanceName, serviceName,routeId } = req.params;

    if (!(await this.isRequestAuthorized(req, kongReadRoutesPermission))) {
      throw new NotAllowedError('Unauthorized');
    }

    try{
      const route = await this.kongServiceManagerApi
      .getRouteFromService(
        instanceName,
        serviceName,
        routeId);

      res
      .status(200)
      .json({
        route
      })
    }
    catch(err:any){
      if (err.errors) {
        throw new InputError(
          `Unable to fetch route [${routeId}] for ${
            serviceName
          }: ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }

  };

  createRoute = async(req:Request, res: Response) => {
    const { instanceName, serviceName } = req.params;
    const { config }  = req.body; 

    if (!(await this.isRequestAuthorized(req, kongCreateRoutePermission ))) {
      throw new NotAllowedError('Unauthorized');
    }

    try{
      const routeCreated = await this.kongServiceManagerApi
      .createRouteFromService(
        instanceName,
        serviceName,
        config);

      res
      .status(201)
      .send({
        route: routeCreated
      })
    }
    catch(err:any){
      if (err.errors) {
        throw new InputError(
          `Unable to create route :
           ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }
  }

  editRoute = async (req: Request,res: Response) => {
    const { instanceName,serviceName, routeId } = req.params;
    const  { config }  = req.body;

    if (!(await this.isRequestAuthorized(req, kongUpdateRoutePermission ))) {
      throw new NotAllowedError('Unauthorized');
    }

    try{ 
      const routeUpdated = await this.kongServiceManagerApi
      .editRouteFromService(
        instanceName,
        serviceName,
        routeId,
        config);

      res
      .status(200)
      .send({
        route: routeUpdated
      })
    }
    catch(err:any){
      if (err.errors) {
        throw new InputError(
          `Unable to edit route [${routeId} ]:
           ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }
  }

  removeRoute = async(req: Request,res: Response) => {
    const { instanceName, serviceName,routeId } = req.params;

    if (!(await this.isRequestAuthorized(req, kongDeleteRoutePermission ))) {
      throw new NotAllowedError('Unauthorized');
    }
   
    try{
      const response = await this.kongServiceManagerApi
      .removeRouteFromService(
        instanceName,
        serviceName,
        routeId);

      res
      .status(200)
      .json(response)
    }catch(err:any){
      if (err.errors) {
        throw new InputError(
          `Unable to remove route [${routeId} ]:
           ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }
  }

}