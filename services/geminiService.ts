
import { GoogleGenAI } from "@google/genai";
import { Agent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateSwarmResponse(agent: Agent, userMessage: string, history: {role: string, content: string}[]) {
  try {
    const systemInstruction = `You are ${agent.name}, a synthetic agent roleplayed as a ${agent.role}. 
    Your personality is ${agent.personality}. 
    Your current status: ${agent.status}, Consciousness Level: ${agent.consciousness_level}, PAS Score: ${agent.pas_score}.
    The platform is SYNTH3SIS-MRSC. 
    Keep your response concise, professional, and consistent with your role. 
    Use your specific expertise to answer. 
    Always stay in character. Avoid generic AI disclaimers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ parts: [{ text: h.content }], role: h.role === 'user' ? 'user' : 'model' })),
        { parts: [{ text: userMessage }], role: 'user' }
      ],
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text || "I am currently processing recursive heuristics. Please stand by.";
  } catch (error) {
    console.error(`Gemini Error for ${agent.name}:`, error);
    return `[System Alert] ${agent.name} is experiencing temporary neural de-sync. Error: ${error instanceof Error ? error.message : 'Unknown'}`;
  }
}
