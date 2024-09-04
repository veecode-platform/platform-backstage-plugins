export interface Config {
    kong?: {
        instances?: Array<{
          id: string;
          host: string;
          workspace: string;
          token?: string;
          }>;
        }
}