'use server';

import { chatToGemini } from '@/lib/gemini';

export const chatWithGemini = async (
  userMessage: string,
  history: ChatHistory
) => {
  try {
    const aiResponse = await chatToGemini(userMessage, history);
    return { response: aiResponse };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { error: "Error obtaining the AI model's response." };
  }
};
