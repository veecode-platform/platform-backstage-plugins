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
        },
    openAi?: {
        apiBaseUrl: string;
        apiKey: string;
        assistant: string;
        model: string;
        instructions: string;
    }
}