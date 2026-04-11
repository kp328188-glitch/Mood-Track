import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiService = {
  async generateChatResponse(message: string, history: { role: "user" | "model"; text: string }[]) {
    try {
      const formattedHistory = history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...formattedHistory, { role: "user", parts: [{ text: message }] }],
        config: {
          systemInstruction: "You are a gentle, empathetic AI companion for 'The Breathing Canvas'. Your goal is to provide a safe space for users to share their thoughts. Keep your responses light, supportive, and concise. Avoid clinical advice; instead, focus on being a good listener and offering gentle perspectives.",
        },
      });
      return response.text || "I'm here for you. Tell me more.";
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "I'm having a little trouble connecting right now, but I'm still here in spirit. Let's take a breath together.";
    }
  },

  async generateJournalReflection(entry: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: `Reflect on this journal entry with empathy and insight. Keep it to 2-3 sentences. Focus on growth and stillness: "${entry}"` }] }],
        config: {
          systemInstruction: "You are a wise and empathetic mentor. Your reflections should feel like a warm hug or a moment of shared silence. Use poetic but grounded language.",
        },
      });
      return response.text || "Your thoughts are heard and valued. Every word is a step on your journey.";
    } catch (error) {
      console.error("Gemini Journal Error:", error);
      return "Sometimes silence is the best reflection. Your words are safe here.";
    }
  },

  async generateMoodAdvice(mood: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: `I am feeling ${mood}. Give me 3 short, practical grounding steps.` }] }],
        config: {
          systemInstruction: "Provide supportive advice for someone feeling a specific emotion. Use a calm, reassuring tone. Format as a short paragraph followed by 3 bullet points.",
        },
      });
      return response.text || "Take a deep breath. You are safe in this moment.";
    } catch (error) {
      console.error("Gemini Mood Error:", error);
      return "Even in the storm, there is a center of calm. Focus on your breath for a moment.";
    }
  }
};
