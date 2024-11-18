import { OpenAIClient } from "../openAIClient";

export class ChatFactory extends OpenAIClient implements ChatFactory{
  async createChat(key: string) {
    const response = await this.client.chat.completions.create({
      model: this.getOpenAIConfig().model ?? "gpt-4",
      messages: [{ role: "user", content: key }],
    });
    return response.choices[0].message.content;
  }
}
