import { ChatProps } from "@veecode-platform/backstage-plugin-vee-common";

export function validateAssistantResponse(response: string): ChatProps {

  // Check if the response is wrapped in ```json delimiters
  if (response.startsWith("```json") && response.endsWith("```")) {

    // Remove the initial and final delimiters
    const cleanedResponse = response.slice(7, -3).trim();
    try {
      return JSON.parse(cleanedResponse) as ChatProps;
    } catch (error) {
      console.error("Error parsing cleaned JSON:", error);
      throw new Error("Assistant response is not valid JSON after cleanup.");
    }
  }

  // Attempt to parse directly as JSON if no delimiters are present
  try {
    const parsedResponse = JSON.parse(response) as ChatProps;

    // If JSON parsing succeeds and the object is valid, return it
    return parsedResponse;
  } catch {
    console.log("Response is not structured JSON, treating as a plain string...");

    // Check if it's a plain string
    if (typeof response === "string") {
      return { text: response, files: [] };
    }
  }

  // If all validations fail, throw an error
  console.error("Response could not be validated or processed as JSON or a string.");
  throw new Error("Assistant response is invalid.");
}
