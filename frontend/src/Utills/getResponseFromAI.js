import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const sendGeminiRequest = async (systemInstruction, userPrompt) => {
  try {
    const fullPrompt = `${systemInstruction}\n\n${userPrompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = result.response.text().trim();
    return response;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, something went wrong while generating the response.";
  }
};
