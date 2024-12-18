import { AuthorizeResult, BasicPermission } from "@backstage/plugin-permission-common";
import type { HttpAuthService, PermissionsService } from "@backstage/backend-plugin-api";
import type { Request } from "express";
import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";


export abstract class AssistantAIController {

    constructor(
        protected httpAuth: HttpAuthService,
        protected permissions: PermissionsService,
        protected config: Config,
        protected logger: LoggerService,
    ){}

    async isRequestAuthorized(req:Request, permission: BasicPermission): Promise<boolean>{
        const credentials = await this.httpAuth.credentials(req);

        const decision = (
            await this.permissions.authorize([{permission: permission}], {credentials})
        )[0];

        return decision.result !== AuthorizeResult.DENY
    }
}