import { AuthorizeResult, BasicPermission } from "@backstage/plugin-permission-common";
import { KongServiceManagerApi } from "../api/types";
import { HttpAuthService, PermissionsService } from "@backstage/backend-plugin-api";
import { Request } from 'express';

export abstract class KongController  {
    constructor(
      protected kongServiceManagerApi: KongServiceManagerApi,
      protected httpAuth: HttpAuthService,
      protected permissions: PermissionsService
    ){}

    async isRequestAuthorized (req: Request, permission: BasicPermission) : Promise<boolean>{
      const credentials = await this.httpAuth.credentials(req);

      const decision = (
        await this.permissions.authorize([{ permission: permission }], {
          credentials,
        })
      )[0];

      return decision.result !== AuthorizeResult.DENY;
    }
}