import { Request, Response } from "express";
import { AssistantAIController } from "./AssistantAIController";
import { CreateStackParams, IStack, veeCreateStackPermission, veeEditStackPermission, veeReadStacksPermission, veeRemoveStackPermission } from "@veecode-platform/backstage-plugin-vee-common";
import { InputError, NotAllowedError, stringifyError } from "@backstage/errors";
import { IStackController } from "./types";

export class StackController extends AssistantAIController implements IStackController {

    /*
    * list all stacks
    */
    ListAllStacks = async (req: Request,resp: Response) => {
        try {
          if (!(await this.isRequestAuthorized(req, veeReadStacksPermission))) {
            throw new NotAllowedError('Unauthorized');
          }
          const allStacks = await this.database.listStacks();
          if (!allStacks) {
            throw new InputError(
              'An error occurred while trying to list the stacks',
            );
          }
          resp.status(200);
          resp.json(allStacks);
        } catch (err: any) {
          if (err.errors) {
            throw new InputError(
              `Error to list all stacks: ${stringifyError(err.errors)}`,
            );
          }
          throw err;
        }
      };
  
    /*
    * get a stack by ID
    */
    getStackById = async (req: Request,resp: Response) => {
      const { stackId } = req.params;
      try {
        if (!(await this.isRequestAuthorized(req, veeReadStacksPermission))) {
          throw new NotAllowedError('Unauthorized');
        }
        const stack = await this.database.getStackById(stackId);
        if (!stack) {
          throw new InputError(
            'Stack not found',
          );
        }
        resp.status(200);
        resp.json(stack);
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error to get stack [ID ${stackId}]: ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
     }
  
    /*
    * create a new stack
    */
    createStack = async (req: Request, resp: Response) => {
      const { name, source, icon, plugins } = req.body as CreateStackParams; 
       if (!name || !source) {
        throw new InputError(
          'The fields {name: string, source: string} are required',
        );
      }
      const newData : CreateStackParams = { name, source};
      if(icon) newData.icon = icon;
      if(plugins) newData.plugins = plugins;

       try {
        if (!(await this.isRequestAuthorized(req, veeCreateStackPermission))) {
          throw new NotAllowedError('Unauthorized');
        }
        const newStack = await this.database.createStack(newData);
        resp.status(201);
        resp.json({
            message: 'New Stack created!',
            data: newStack
        });
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error to create a new stack: ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
    }
  
    /* 
    * update a stack
    */
    editStack = async (req: Request, resp: Response) => {
     const { stackId } = req.params;
     const { name, source, icon, plugins } = req.body as Partial<CreateStackParams>;
     const updateData : Partial<IStack> = {};

     if(name) updateData.name = name;
     if(source) updateData.source = source;
     if(icon) updateData.icon = icon
     if(plugins) updateData.plugins = plugins;

    try {
     if (!(await this.isRequestAuthorized(req, veeEditStackPermission))) {
       throw new NotAllowedError('Unauthorized');
        }
     if(Object.keys(updateData).length === 0) {
        resp.status(304);
        resp.json({
            message: 'Not Modified',
            data: null
        })
     }
     const stackUpdated = await this.database.updateStack({stackId, stack: updateData});
     resp.status(200);
     resp.json({
         message: 'Stack updated!',
         data: stackUpdated
     });
    } catch (err: any) {
      if (err.errors) {
        throw new InputError(
          `Error to update stack [ID: ${stackId}]: ${stringifyError(err.errors)}`,
        );
      }
      throw err;
    }
    }
  
    /*
    * delete a fixedOptions
    */
    deleteStack = async (req: Request, resp:Response) => {
      const { stackId } = req.params;
      try {
        if (!(await this.isRequestAuthorized(req, veeRemoveStackPermission))) {
            throw new NotAllowedError('Unauthorized');
            };
        await this.database.deleteStack(stackId);          
        resp.status(200);
        resp.json({ message: 'Stack Deleted!'});
      }catch (err: any) {
        if (err.errors) {
             throw new InputError(
               `Error to delete the stack, [ID: ${stackId}]: ${stringifyError(err.errors)}`,
             );
           }
        throw err;
      }
    }
}