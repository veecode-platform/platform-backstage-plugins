import { Request, Response } from "express";
import { KongController } from "./kongController";
import { InputError, NotAllowedError, stringifyError } from "@backstage/errors";
import { IPluginsController } from "./types";
import { kongReadAvailablePluginsPermission } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export class PluginsController extends KongController implements IPluginsController{
    getEnabledPlugins = async (req: Request, res: Response) => {    
        const { instanceName } = req.params;
    
        if (!(await this.isRequestAuthorized(req, kongReadAvailablePluginsPermission))) {
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
    
        if (!(await this.isRequestAuthorized(req, kongReadAvailablePluginsPermission))) {
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
}