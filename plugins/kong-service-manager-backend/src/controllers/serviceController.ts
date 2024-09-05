import { Request, Response } from "express";
import { KongController } from "./kongController";
import { IServiceController } from "./types";
import { InputError, stringifyError } from "@backstage/errors";

export class ServiceController extends KongController implements IServiceController{
  
  getServiceInfo = async (req: Request, res: Response) => {
    
    const { serviceName, instanceName } = req.params;

    try{ /** check response */
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
}