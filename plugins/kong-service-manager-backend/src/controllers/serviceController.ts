import { Request, Response } from "express";
import { KongController } from "./kongController";
import { IServiceController } from "./types";
import { InputError, NotAllowedError, stringifyError } from "@backstage/errors";
import { kongApplyPluginToServicePermission, kongDisableServicePluginPermission, kongServiceReadPermission, kongUpdateServicePluginPermission } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export class ServiceController extends KongController implements IServiceController{
  
  getServiceInfo = async (req: Request, res: Response) => {   
    const { serviceName, instanceName } = req.params;

    if (!(await this.isRequestAuthorized(req, kongServiceReadPermission))) {
      throw new NotAllowedError('Unauthorized');
    }

    try{ 
      const data = await this.kongServiceManagerApi
      .getServiceInfo(
        instanceName, 
        serviceName);

      res
      .status(200)
      .json({
        service: data
      })
    }
    catch(err:any){
      if (err.errors) {
        throw new InputError(
          `Unable to info service ${serviceName}:
           ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }
  }
 
  getAssociatedPlugins = async (req: Request, res: Response) => {
    const { instanceName, serviceName } = req.params;

    try {
      const associatedPlugins =
        await this.kongServiceManagerApi
        .getServiceAssociatedPlugins(
          instanceName,
          serviceName,
        );

      res.status(200).json({
        plugins: associatedPlugins,
      });
      
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Unable to fetch associated plugins for ${serviceName}: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }
  };

  addPluginToService = async (req: Request, res: Response) => {
    const { instanceName,serviceName } = req.params;
    const  { config }   = req.body;

    if (!(await this.isRequestAuthorized(req, kongApplyPluginToServicePermission ))) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const response = await this.kongServiceManagerApi
      .createServicePlugin(
        instanceName,
        serviceName,
        config,
      );

      res.status(201).json(response);

    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Unable to created plugin in ${serviceName}: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }
  };

  editServicePlugin = async (req: Request, res: Response) => {
    const { instanceName, serviceName, pluginId } = req.params;
    const { config } = req.body;

    if (!(await this.isRequestAuthorized(req, kongUpdateServicePluginPermission ))) {
      throw new NotAllowedError('Unauthorized');
    }


    try {
      const response = await this.kongServiceManagerApi
      .editServicePlugin(
        instanceName,
        serviceName,
        pluginId,
        config,
      );

      res.status(200).send(response);

    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Unable to edit plugin in ${serviceName}: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }
  };

  removeServicePlugin = async (req: Request, res: Response) => {
    const { instanceName, serviceName,pluginId } = req.params;

    if (!(await this.isRequestAuthorized(req, kongDisableServicePluginPermission ))) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const response = await this.kongServiceManagerApi
      .removeServicePlugin(
        instanceName,
        serviceName,
        pluginId,
      );
        res.status(204).json(response);

    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Unable to delete plugin [${pluginId}] in ${serviceName}: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }
  };
}