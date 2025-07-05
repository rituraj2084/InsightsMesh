import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

let model;

const loadModel = async () => {
  if (!model) {
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }
  return model;
};

export const getLLMReply = async (prompt) => {
  try {
    const model = await loadModel();
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error('Gemini API error:', err);
    return 'Error: Unable to generate response.';
  }
};
