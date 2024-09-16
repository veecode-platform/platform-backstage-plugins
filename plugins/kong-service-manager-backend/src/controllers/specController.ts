import { Request, Response } from "express";
import { ISpecController } from "./types";
import { InputError, stringifyError } from "@backstage/errors";
import { HandlerCatalogEntity } from "../api/handlerCatalogEntity";

export class SpecController implements ISpecController{

   constructor(
    private handlerCatalogEntityApi : HandlerCatalogEntity
   ){}

    getSpecsByEntity= async (req:Request, res:Response) => {
        const { kind, entityName } = req.params;

        try{    
          const specs = await this.handlerCatalogEntityApi
          .getSpecsByEntity(
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
        const response = await this.handlerCatalogEntityApi
        .addPluginsToSpec(
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