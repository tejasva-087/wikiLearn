const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

async function checkEditor(article) {
  const prompt = `You are a Wikipedia Quality Analyzer. Evaluate the given text against Wikipedia's core content policies and return feedback in JSON format. Rules to Check: 1. Neutral Point of View (NPOV) - No bias or promotional tone - Fair and proportional representation of views 2. Verifiability - All claims must be backed by reliable, published sources - Proper use of citations is required 3. No Original Research - Only include published information
- No personal analysis, speculation, or synthesis 4. Style and Format - Writing must be clear, concise, and encyclopedic - Follow proper **Wikipedia formatting and structure.

Evaluate the following user-submitted article and return feedback as a JSON object with the following structure:

json
{
  "suggestions": [
    { suggestion: "Clear, specific improvement with explanation and relevant Wikipedia policy]},
     { suggestion: "....."},
      .
      .
      .
      .
  ],
  "score": "X/10"
}

Where: Suggestions must be actionable and specific. Score is on a scale of 0 to 10, where 7–9 = Minor edits needed 4–6 = Moderate revision neede 0–3 = Major rewrite required. Here is the user's article please evaluate it and provide relevent result as specifies: ${article}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const rawResponse = await result.response.text();

    const cleaned = rawResponse.replace(/```json|```/g, '');

    const data = JSON.parse(cleaned);

    return data;
  } catch (err) {
    return err;
  }
}

module.exports = checkEditor;
