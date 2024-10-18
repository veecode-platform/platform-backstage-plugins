import { Request, Response } from "express";
import { KongController } from "./kongController";
import { IServiceController } from "./types";
import { InputError, NotAllowedError, stringifyError } from "@backstage/errors";
import { kongServiceManagerApplyPluginToServicePermission, kongServiceManagerDisablePluginFromServicePermission, kongServiceManagerReadPluginsAssociatedPermission, kongServiceManagerReadPluginsAvailablePermission, kongServiceManagerReadServicePermission, kongServiceManagerUpdatePluginOnTheServicePermission } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export class ServiceController extends KongController implements IServiceController{
  
  getServiceInfo = async (req: Request, res: Response) => {   
    const { serviceName, instanceName } = req.params;

    if (!(await this.isRequestAuthorized(req, kongServiceManagerReadServicePermission))) {
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

  getEnabledPlugins = async (req: Request, res: Response) => {    
    const { instanceName } = req.params;

    if (!(await this.isRequestAuthorized(req, kongServiceManagerReadPluginsAvailablePermission))) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const pluginList = await this.kongServiceManagerApi
      .getEnabledPlugins(
        instanceName
      );

      res.status(200).json({
        plugins: pluginList,
      });
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Unable to fetch enabled plugins: ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }
  };

  getPluginFields = async (req: Request, res: Response) => {
    const { instanceName, pluginName } = req.params;

    if (!(await this.isRequestAuthorized(req, kongServiceManagerReadPluginsAvailablePermission))) {
      throw new NotAllowedError('Unauthorized');
    }

    try {
      const pluginFields = await this.kongServiceManagerApi
      .getPluginFields(
        instanceName,
        pluginName,
      );

      res.status(200).json({
        fields: pluginFields,
      });
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Unable to fetch enabled plugin field for ${pluginName}: ${stringifyError(
            err.errors,
          )}`,
        );
      }
      throw err;
    }
  };

  getAssociatedPlugins = async (req: Request, res: Response) => {
    const { instanceName, serviceName } = req.params;

    if (!(await this.isRequestAuthorized(req, kongServiceManagerReadPluginsAssociatedPermission))) {
      throw new NotAllowedError('Unauthorized');
    }

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

    if (!(await this.isRequestAuthorized(req, kongServiceManagerApplyPluginToServicePermission ))) {
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

    if (!(await this.isRequestAuthorized(req, kongServiceManagerUpdatePluginOnTheServicePermission ))) {
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

    if (!(await this.isRequestAuthorized(req, kongServiceManagerDisablePluginFromServicePermission ))) {
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