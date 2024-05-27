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
            };
      };
    } 
  }
  