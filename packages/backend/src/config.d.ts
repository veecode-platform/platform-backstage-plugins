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
    veecodeAssistantAI?:{
      openai?: {
        apiBaseUrl: string;
        apiKey: string;
        assistant: string;
        model: string;
        instructions: string;
        timeout?:string;
        dataset?: {
          model?: string;
          references?: Array<{
            id: string;
            source: string;
            }>;
        }
      }
    }
}