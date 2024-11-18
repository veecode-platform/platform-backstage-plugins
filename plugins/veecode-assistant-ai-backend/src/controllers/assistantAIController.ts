import { HttpAuthService, PermissionsService } from "@backstage/backend-plugin-api";
import { AuthorizeResult, BasicPermission } from "@backstage/plugin-permission-common";
import { OpenAIApi } from "../api";
import { Request } from "express";


export abstract class AssistantAIController {
    constructor(
        protected openAIApi: OpenAIApi,
        protected httpAuth: HttpAuthService,
        protected permissions: PermissionsService
    ){}

    async isRequestAuthorized(req:Request, permission: BasicPermission): Promise<boolean>{
        const credentials = await this.httpAuth.credentials(req);

        const decision = (
            await this.permissions.authorize([{permission: permission}], {credentials})
        )[0];

        return decision.result !== AuthorizeResult.DENY
    }
}