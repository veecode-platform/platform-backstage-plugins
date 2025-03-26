export interface Config {
    kong?: {
        instances?: Array<{
          id: string;
          apiBaseUrl: string;
          workspace: string;
          auth:{
            kongAdmin?: string,
            custom?:{
              header: string,
              value: string
            }
          }
          }>;
        };
    vee?:{
      openai?: {
        apiBaseUrl: string;
        apiKey: string;
        model: string;
        timeout?:string;
        templateGeneration?: {
          model?: string;
          catalog?: string;
        }
      }
    }
}