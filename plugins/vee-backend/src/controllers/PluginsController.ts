import { CreatePluginParams, IPlugin, veeAddPluginPermission, veeEditPluginPermission, veeReadPluginsPermission, veeRemovePluginPermission } from "@veecode-platform/backstage-plugin-vee-common";
import { AssistantAIController } from "./AssistantAIController";
import type { Request, Response } from "express";
import { InputError, NotAllowedError, stringifyError } from "@backstage/errors";
import { IPluginsController } from "./types";

export class PluginsController extends AssistantAIController  implements IPluginsController{

    /*
    * list all plugins
    */
    ListAllPlugins = async (req: Request,resp: Response) => {
        try {
          if (!(await this.isRequestAuthorized(req, veeReadPluginsPermission))) {
            throw new NotAllowedError('Unauthorized');
          }
          const allPlugins = await this.database.listPlugins();
          if (!allPlugins) {
            throw new InputError(
              'An error occurred while trying to list the plugins',
            );
          }
          resp.status(200);
          resp.json(allPlugins);
        } catch (err: any) {
          if (err.errors) {
            throw new InputError(
              `Error to list all plugins: ${stringifyError(err.errors)}`,
            );
          }
          throw err;
        }
      };
  
    /*
    * get a plugin by ID
    */
    getPluginById = async (req: Request,resp: Response) => {
      const { pluginId } = req.params;
      try {
        if (!(await this.isRequestAuthorized(req, veeReadPluginsPermission))) {
          throw new NotAllowedError('Unauthorized');
        }
        const plugin = await this.database.getPluginById(pluginId);
        if (!plugin) {
          throw new InputError(
            'Plugin not found',
          );
        }
        resp.status(200);
        resp.json(plugin);
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error to get plugin [ID ${pluginId}]: ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
     }
  
    /*
    * Add plugin
    */
    addPlugin = async (req: Request, resp: Response) => {
      const { name, docs, annotations } = req.body as CreatePluginParams; 
       if (!name || !docs || !annotations) {
        throw new InputError(
          'The fields {name, docs} are required',
        );
      }

       try {
        if (!(await this.isRequestAuthorized(req, veeAddPluginPermission))) {
          throw new NotAllowedError('Unauthorized');
        }
        const newPlugin = await this.database.createPlugin({name, docs, annotations});
        resp.status(201);
        resp.json({
            message: 'New Plugin Add!',
            data: newPlugin
        });
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error to add a new plugin: ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
    }
  
    /* 
    * update a plugin
    */
    editPlugin = async (req: Request, resp: Response) => {
     const { pluginId } = req.params;
     const { name, docs, annotations } = req.body as Partial<CreatePluginParams>;
     const updateData : Partial<IPlugin> = {};

     if(name) updateData.name = name;
     if(docs) updateData.docs = docs;
     if(annotations) updateData.annotations = annotations;

    try {
     if (!(await this.isRequestAuthorized(req, veeEditPluginPermission))) {
       throw new NotAllowedError('Unauthorized');
        }
     if(Object.keys(updateData).length === 0) {
        resp.status(304);
        resp.json({
            message: 'Not Modified',
            data: null
        })
     }
     const pluginUpdated = await this.database.updatePlugin({pluginId, plugin: updateData});
     resp.status(200);
     resp.json({
         message: 'Plugin updated!',
         data: pluginUpdated
     });
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Error to update plugin [ID: ${pluginId}]: ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }
    }
  
    /*
    * delete a plugin
    */
    deleteStack = async (req: Request, resp:Response) => {
      const { pluginId } = req.params;
      try {
        if (!(await this.isRequestAuthorized(req, veeRemovePluginPermission))) {
            throw new NotAllowedError('Unauthorized');
        };
        await this.database.deletePlugin(pluginId);      
        resp.status(200);
        resp.json({ message: 'Plugin Deleted!'});
      }catch (err: any) {
        if (err.errors) {
             throw new InputError(
               `Error to delete the plugin, [ID: ${pluginId}]: ${stringifyError(err.errors)}`,
             );
           }
        throw err;
      }
    }
}