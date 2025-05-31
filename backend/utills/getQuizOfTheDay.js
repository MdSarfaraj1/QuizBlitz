const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports.generateQuizOfTheDay = async (topic) => {
  try {
    const prompt = `
You are a computer science expert AI. Generate **one high-quality multiple-choice quiz question** on the topic: **"${topic}"**.

Strictly return **only valid JSON** in the following format (no extra text, no code block):

{
  "quizCategory": "Category of the quiz question, e.g., 'Computer Science Fundamentals','JavaScript Basics', 'Data Structures', etc.",
  "question": "Write the quiz question here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Correct option exactly as listed in options array",
  "explanation": "A short explanation of the correct answer"
}

Rules:
- The question should be clear and conceptual (no trivia).
- Only one correct answer.
- Keep language simple for students.
- Avoid markdown/code blocks or extra output.
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().replace(/```json\s*|```/g, "").trim();
    console.log(raw)
    return JSON.parse(raw);

  } catch (e) {
    console.error("Error generating quiz from Gemini:", e);
    return null;
  }
};
