
import { GoogleGenAI, Type } from "@google/genai";
import { PitchDeckInput, GeneratedDeck } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generatePitchDeck = async (input: PitchDeckInput): Promise<GeneratedDeck> => {
  const prompt = `Generate a professional 10-slide pitch deck for a startup called "${input.startupName}".
  
  Details:
  - Problem: ${input.problem}
  - Solution: ${input.solution}
  - Market: ${input.targetMarket}
  - Business Model: ${input.businessModel}
  - UVP: ${input.uvp}
  - Technology: ${input.technology}
  - Competitive Advantage: ${input.competitiveAdvantage}
  - Team: ${input.team || "Not specified"}
  - Funding Ask: ${input.fundingAsk || "Not specified"}

  Generate exactly 10 slides with the following titles:
  1. Cover (Include project name and a punchy tagline)
  2. The Problem (Deep dive into the pain points)
  3. The Solution (How we solve it clearly)
  4. Market Opportunity (Size, TAM/SAM/SOM, trends)
  5. The Product (Features and user experience)
  6. Business Model (Monetization and pricing)
  7. Technology & Innovation (Technical stack or unique IP)
  8. Competitive Advantage (Why we win)
  9. Roadmap & Traction (Milestones: past, present, future)
  10. The Ask & Call to Action (Support needed and contact)

  The content should be professional, investor-ready, and concise (3-5 bullet points per slide).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          startupName: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                bullets: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                footer: { type: Type.STRING }
              },
              required: ["title", "bullets"]
            }
          }
        },
        required: ["startupName", "slides"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result as GeneratedDeck;
};
