export interface OpenAIResponse {
    id: string;
    object: string;
    [key: string]: any;
  }

export interface PullRequestResponse {
  status: string,
  link: string,
  message: string
}