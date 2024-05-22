export interface Config {
    /**
   * @visibility frontend
   */
    proxy?: {
      /** @visibility frontend */
      endpoints?: {
        /** @visibility frontend */
        [key: string]:
          | string
          | {
               /** @visibility frontend */
                target: string;
               /** @visibility frontend */
                allowedHeaders?: string[];
               /** @visibility frontend */
                workspace?: string;
               /** @visibility frontend */
                headers?: {
                    /** @visibility secret */
                    Authorization?: string;
                    /** @visibility secret */
                    authorization?: string;
                    /** @visibility secret */
                    'X-Api-Key'?: string;
                    /** @visibility secret */
                    'x-api-key'?: string;
                    [key: string]: string | undefined;
                    };
               /**
               * @visibility frontend
               */
                allowedMethods?: string[];
               /**
               * The credentials policy to apply.
               *
               * @remarks
               *
               * The values are as follows:
               *
               * - 'require': Callers must provide Backstage user or service
               *   credentials with each request. The credentials are not
               *   forwarded to the proxy target.
               * - 'forward': Callers must provide Backstage user or service
               *   credentials with each request, and those credentials are
               *   forwarded to the proxy target.
               * - 'dangerously-allow-unauthenticated': No Backstage credentials
               *   are required to access this proxy target. The target can still
               *   apply its own credentials checks, but the proxy will not help
               *   block non-Backstage-blessed callers.
               *
               * Note that if you have
               * `backend.auth.dangerouslyDisableDefaultAuthPolicy` set to `true`,
               * the `credentials` value does not apply; the proxy will behave as
               * if all endpoints were set to `dangerously-allow-unauthenticated`.
               */
              credentials?:
                | 'require'
                | 'forward'
                | 'dangerously-allow-unauthenticated';
            };
      };
    } 
  }
  