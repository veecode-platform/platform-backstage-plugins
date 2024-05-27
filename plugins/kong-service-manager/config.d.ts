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
                workspace?: string;
            };
      };
    } 
  }
  