import { Request, Response } from "express";
import { KongController } from "./kongController";
import { ISpecController } from "./types";
import { InputError, stringifyError } from "@backstage/errors";

export class SpecController extends KongController implements ISpecController{

    getSpecsByEntity= async (req:Request, res:Response) => {
        const { kind, entityName } = req.params;

        try{    
          const specs = await this.kongServiceManagerApi
          .getPluginsFromSpec(
            kind,
            entityName
          );

          res
          .status(200)
          .json({
            specs
           })
        }
        catch(err:any){
            if (err.errors) {
                throw new InputError(
                  `Unable to info entity:
                   ${stringifyError(err.errors)}`,
                );
              }
              throw err;  
        }
    }

    updateSpec = async (req:Request, res:Response) => {
      const { specName } = req.params;
      const { plugins } = req.body;
      
      try{ 
        const response = await this.kongServiceManagerApi
        .applyPluginsToSpec(
          specName,
           plugins
          );

        res
        .status(200)
        .json({
          spec: response
        })
      }catch(err:any){
        if (err.errors) {
          throw new InputError(
            `Unable to update in spec [${specName}]:
             ${stringifyError(err.errors)}`,
          );
        }
        throw err;  
      }

    }

}