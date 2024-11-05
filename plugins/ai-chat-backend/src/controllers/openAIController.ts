import { HttpAuthService, LoggerService } from "@backstage/backend-plugin-api";
import { OpenAIApi } from "../api/types";

export abstract class OpenAIController {
    constructor(
        protected openAIApi: OpenAIApi,
        protected httpAuth: HttpAuthService,
        protected logger: LoggerService
    ){};
}