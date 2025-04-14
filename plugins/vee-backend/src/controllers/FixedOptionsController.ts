import { Request, Response } from "express";
import { AssistantAIController } from "./AssistantAIController";
import { InputError, NotAllowedError, stringifyError } from "@backstage/errors";
import { CreateFixedOptionsParams, IFixedOptions, veeManageFixedOptionsPermission, veeReadPermission } from "@veecode-platform/backstage-plugin-vee-common";
import { IFixedOptionsController } from "./types";

export class FixedOptionsController extends AssistantAIController implements IFixedOptionsController {

    /* 
    * list all fixedOptions
    */
    ListAllFixedOptions = async (req: Request,resp: Response) => {
      try {
        if (!(await this.isRequestAuthorized(req, veeReadPermission))) {
          throw new NotAllowedError('Unauthorized');
        }
        const allFixedOptions = await this.database.listFixedOptions();
        if (!allFixedOptions) {
          throw new InputError(
            'An error occurred while trying to list the fixed options',
          );
        }
        resp.status(200);
        resp.json(allFixedOptions);
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error to list all fixed options: ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
    };

    /*
    * get a fixedoptions by id
    */
    getFixedOptionsById = async (req: Request,resp: Response) => {
        const { fixedOptionsId } = req.params;
        try {
          if (!(await this.isRequestAuthorized(req, veeReadPermission))) {
            throw new NotAllowedError('Unauthorized');
          }
          const fixedOptions = await this.database.getFixedOptionsById(fixedOptionsId);
          if (!fixedOptions) {
            throw new InputError(
              'Fixed options not found',
            );
          }
          resp.status(200);
          resp.json(fixedOptions);
        } catch (err: any) {
          if (err.errors) {
            throw new InputError(
              `Error to get fixed options [ID ${fixedOptionsId}]: ${stringifyError(err.errors)}`,
            );
          }
          throw err;
        }
      }

    /*
    * create a new fixedOptions
    */
    createFixedOptions = async (req: Request, resp: Response) => {
       const { type, options } = req.body as CreateFixedOptionsParams;  

       if (!type || !options) {
        throw new InputError(
          'The fields {type: string, options: Option[]} are required',
        );
       }

       try {
        if (!(await this.isRequestAuthorized(req, veeManageFixedOptionsPermission))) {
          throw new NotAllowedError('Unauthorized');
        }
        const newFixedOptions = await this.database.createFixedOptions({type, options});
        resp.status(201);
        resp.json({
            message: 'New Fixed Options created!',
            data: newFixedOptions
        });
      } catch (err: any) {
        if (err.errors) {
          throw new InputError(
            `Error to create a new fixed options: ${stringifyError(err.errors)}`,
          );
        }
        throw err;
      }
    }

    /*
    * update a fixedOptions
    */
    editFixedOptions = async (req: Request, resp: Response) => {
        const { fixedOptionsId } = req.params;
        const { type, options } = req.body as Partial<CreateFixedOptionsParams>;
        const updateData : Partial<IFixedOptions> = {};

        if(type) updateData.type = type;
        if(options) updateData.options = options;

        try {
         if (!(await this.isRequestAuthorized(req, veeManageFixedOptionsPermission))) {
           throw new NotAllowedError('Unauthorized');
         }

         if(Object.keys(updateData).length === 0) {
            resp.status(304);
            resp.json({
                message: 'Not Modified',
                data: null
            })
         }
         const fixedOptionsUpdated = await this.database.updateFixedOption({fixedOptionsId, fixedOptions: updateData});
         resp.status(200);
         resp.json({
             message: 'Fixed options updated!',
             data: fixedOptionsUpdated
         });
       } catch (err: any) {
         if (err.errors) {
           throw new InputError(
             `Error to update the fixed options [ID: ${fixedOptionsId}]: ${stringifyError(err.errors)}`,
           );
         }
         throw err;
       }
     }

    /*
    * delete a fixedOptions
    */
    deleteFixedOptions = async (req: Request, resp:Response) => {
        const { fixedOptionsId } = req.params;
        try {
         if (!(await this.isRequestAuthorized(req, veeManageFixedOptionsPermission))) {
           throw new NotAllowedError('Unauthorized');
         }
         await this.database.deleteFixedOption(fixedOptionsId);         
         resp.status(200);
         resp.json({
             message: 'Fixed Options Deleted!',
         });
       } catch (err: any) {
         if (err.errors) {
           throw new InputError(
             `Error to delete the fixed options, [ID: ${fixedOptionsId}]: ${stringifyError(err.errors)}`,
           );
         }
         throw err;
       }
    }
}