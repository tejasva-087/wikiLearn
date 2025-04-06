const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

async function runQuizGenerator(data) {
  const prompt = `You are a multiple-choice question generator trained on the following data: ${data}. Your task is to generate random practical MCQs based only on the above data. Return each MCQ in the following JSON format. Each question should be based on facts or concepts from the input data. The correct answer must be accurate and derived from the data. Distractor options should be plausible but incorrect. Randomize the order of the options generate 5 random MCQ based on the data above.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const rawResponse = await result.response.text();

    const cleaned = rawResponse.replace(/```json|```/g, "");

    let mcqs;
    try {
      mcqs = JSON.parse(cleaned);
      console.log(mcqs);
    } catch (err) {
      console.error("Failed to parse JSON:", err.message);
    }

    return mcqs;
  } catch (err) {
    return err;
  }
}

module.exports = runQuizGenerator;
