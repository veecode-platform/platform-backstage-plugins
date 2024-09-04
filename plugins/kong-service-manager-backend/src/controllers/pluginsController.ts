import { Request, Response } from 'express';
import { InputError, stringifyError } from '@backstage/errors';
import { KongController } from './kongController';
import { IPluginsController } from './types';

export class PluginsController extends KongController implements IPluginsController {
  
  getEnabledPlugins = async (req: Request, res: Response) => {
    
    const { serviceName } = req.params;
    const { instanceName } = req.body;
    const  search  = req.query.search as string;

    try {
      const pluginList = await this.kongServiceManagerApi
      .getEnabledPlugins(
        instanceName,
        serviceName,
        search
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

    const { instanceName, pluginName } = req.body;

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

    const { serviceName } = req.params;
    const { instanceName } = req.body;

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

    const { serviceName } = req.params;
    const { instanceName, configs } = req.body;
    
    try {
      /** CHECK */
      const response = await this.kongServiceManagerApi
      .createServicePlugin(
        instanceName,
        serviceName,
        configs,
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

    const { serviceName } = req.params;
    const { instanceName, pluginId, configs } = req.body;

    try {
      /** Check response */
      const response = await this.kongServiceManagerApi
      .editServicePlugin(
        instanceName,
        serviceName,
        pluginId,
        configs,
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

    const { serviceName } = req.params;
    const { instanceName, pluginId } = req.body;

    try {
      const response = await this.kongServiceManagerApi
      .removeServicePlugin(
        instanceName,
        serviceName,
        pluginId,
      );

      res.status(200).json({
        message: response,
      });
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
