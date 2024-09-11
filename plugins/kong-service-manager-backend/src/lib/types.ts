/**
*  @public
*/
export interface IKongConfig{
 getConfig: () => FromConfig,
 getInstance: (instanceId:string) => IKongConfigOptions
}

/**
 *  @public
 */
export interface FromConfig {
  instances: IKongConfigOptions[],
  backendBaseUrl: string
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