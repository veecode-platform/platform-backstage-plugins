import { Request, Response } from "express";
import { KongController } from "./kongController";
import { ISpecController } from "./types";
import { InputError, stringifyError } from "@backstage/errors";

export class SpecController extends KongController implements ISpecController{

    getSpecsByEntity= async (req:Request, res:Response) => {
        const { kind, name } = req.params;
        try{    
          const specs = await this.kongServiceManagerApi
          .getSpecsByEntity(
            kind,
            name
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

}