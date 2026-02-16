
import { GoogleGenAI, Type } from "@google/genai";
import { Game } from "../types";

export const getAIRecommendation = async (userInput: string, gamesList: Game[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const gamesSummary = gamesList.length > 0 
    ? gamesList.map(g => `${g.title} (${g.category}): ${g.description}`).join('\n')
    : "No games are currently listed in the hangar.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User wants a game recommendation. User says: "${userInput}". 
      Here are the available games:
      ${gamesSummary}
      
      Note: If no games are available, politely inform the user that the galactic fleet is currently undergoing maintenance but suggest they check back soon for stealthy new releases.`,
      config: {
        systemInstruction: "You are 'Echo', the stealthy AI operator for Sneak It. You are cool, helpful, and love space-themed metaphors.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return "The communication array is down. I can't access the fleet archives right now. Try refreshing your link!";
  }
};
