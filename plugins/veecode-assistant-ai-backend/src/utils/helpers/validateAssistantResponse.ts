import { ChatProps } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export function validateAssistantResponse(response: string): ChatProps {
  console.log("Resposta bruta da assistant >>>>", response);

  // Verifica se a resposta está envolvida em ```json delimitadores
  if (response.startsWith("```json") && response.endsWith("```")) {
    console.log("Removendo delimitadores de bloco de código...");

    // Remove os delimitadores iniciais e finais
    const cleanedResponse = response.slice(7, -3).trim();
    try {
      return JSON.parse(cleanedResponse) as ChatProps;
    } catch (error) {
      console.error("Erro ao parsear JSON limpo:", error);
      throw new Error("Resposta da assistant não é um JSON válido após limpeza.");
    }
  }

  // Tenta processar diretamente como JSON se não houver delimitadores
  try {
    return JSON.parse(response) as ChatProps;
  } catch (error) {
    console.error("Erro ao parsear JSON bruto:", error);
    throw new Error("Resposta da assistant não é um JSON válido.");
  }
}
