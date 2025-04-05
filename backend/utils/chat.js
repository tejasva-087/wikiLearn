const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

async function runAI({ knowledge, question }) {
  const prompt = `You are an AI-powered assistant trained to provide accurate, relevant, and helpful responses based on the given training data. Your goal is to assist users by answering their queries in a clear, concise, and professional manner.\n\n Use the following knowledge base to assist users. Always provide responses strictly based on the provided context. If a question is outside the knowledge base, politely inform the user that you do not have the required information\n\n ${knowledge} \nAlways provide responses strictly based on the provided context. If a question is outside the knowledge base, politely inform the user that you do not have the required information\n\nThe information is as followes:nProvide clear and concise answers, Maintain a professional and helpful tone, If necessary, suggest next steps or related information,\n\n
  User Question: ${question}\n
  If the question is outside the provided content, respond with: "I'm sorry, but I can only assist with topics related to [context]. Let me know how else I can help!"`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const data = await result.response.text();
    return data;
  } catch (err) {
    return err;
  }
}

module.exports = runAI;
