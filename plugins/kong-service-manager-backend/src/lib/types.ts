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
    host: string,
    workspace: string,
    token: string
  }
