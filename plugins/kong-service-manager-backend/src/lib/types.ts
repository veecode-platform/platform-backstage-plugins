/**
*  @public
*/
export interface IKongConfig{
 getConfig: () => IKongConfigOptions[],
 getInstance: (instanceId:string) => IKongConfigOptions
}

/**
 *  @public
 */
export interface IKongConfigOptions {
    id: string,
    apiBaseUrl: string,
    workspace: string,
    auth: IKongAuth
  }

/**
 *  @public
 */
export interface IKongAuth{
  kongAdmin?:string,
  custom?: Required<Custom>
}

/**
 *  @public
 */
export type Custom = {
  header: string,
  value: string
}