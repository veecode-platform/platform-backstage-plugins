import { AuthorizeResult, BasicPermission } from "@backstage/plugin-permission-common";
import type { HttpAuthService, PermissionsService } from "@backstage/backend-plugin-api";
import type { Request } from "express";
import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { extractToken } from "../utils/helpers/extractToken";
import { GitManager } from "../api/git/gitManager";


export abstract class AssistantAIController {

    constructor(
        protected httpAuth: HttpAuthService,
        protected permissions: PermissionsService,
        protected config: Config,
        protected logger: LoggerService,
    ){ }

    protected getToken(req:Request){
        const headerAuthorization = req.headers['git-authorization'] as string;
        if(!headerAuthorization){
            throw new Error("Error: Not Found Authorization token")
        }
        const token = extractToken(headerAuthorization);
        return token          
    } 

    protected gitManager(){
        return new GitManager(this.logger);
    }


    async isRequestAuthorized(req:Request, permission: BasicPermission): Promise<boolean>{
        const credentials = await this.httpAuth.credentials(req);

        const decision = (
            await this.permissions.authorize([{permission: permission}], {credentials})
        )[0];

        return decision.result !== AuthorizeResult.DENY
    }
}