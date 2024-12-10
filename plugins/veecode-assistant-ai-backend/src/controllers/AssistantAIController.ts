import { AuthorizeResult, BasicPermission } from "@backstage/plugin-permission-common";
import type { HttpAuthService, PermissionsService } from "@backstage/backend-plugin-api";
import type { Request } from "express";
import { extractToken } from "../utils/helpers/extractToken";
import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { GitManager } from "../api/git/gitManager";
import { VeeCodeAssistantAIClient } from "../api/client";


export abstract class AssistantAIController {

    constructor(
        protected httpAuth: HttpAuthService,
        protected permissions: PermissionsService,
        protected config: Config,
        protected logger: LoggerService,
    ){}

    protected getToken(req:Request){
        const header = req.headers.authorization;
        if(!header){
            throw new Error("Error: Not Found Authorization token")
        }
        const token = extractToken(header);
        return token          
    } 

    protected veeCodeAssistantAI(engine:string){
        return new VeeCodeAssistantAIClient(this.config, this.logger, engine)
    }

    protected gitProviderManager(token: string){
        return new GitManager(this.config, this.logger, token);
    }

    async isRequestAuthorized(req:Request, permission: BasicPermission): Promise<boolean>{
        const credentials = await this.httpAuth.credentials(req);

        const decision = (
            await this.permissions.authorize([{permission: permission}], {credentials})
        )[0];

        return decision.result !== AuthorizeResult.DENY
    }
}