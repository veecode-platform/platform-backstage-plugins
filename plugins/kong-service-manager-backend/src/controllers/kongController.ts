import { KongServiceManagerApi } from "../api/types";

export abstract class KongController  {
    constructor(
      protected kongServiceManagerApi: KongServiceManagerApi,
    ){}
}