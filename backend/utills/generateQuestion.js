const Category=require('../models/Category')
const Question = require("../models/Questions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
module.exports.generateQuestions = async ( categoryId, difficulty, numberOfQuestions) => {
    try {
        const category = await Category.findById(categoryId).select("title");
        if (!category) {
            throw new Error("Category not found");
        }

        // Prepare prompt for the AI
        const prompt = `Generate ${numberOfQuestions} multiple choice questions about ${category.title} at ${difficulty} difficulty level.
            For each question, provide:
            1. The question text
            2. Four possible answers (ensure only one is correct)
            3. The correct answer
            4. A brief hint
            
            Format the response as a array with objects containing:
            {
                "questionText": "...",
                "options": ["a", "b", "c", "d"],
                "correctAnswer": "...",
                "hint": "..."
            }`;


        // Generate questions using Gemini AI
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
// Remove Markdown code block markers like ```json and ```
        text = text.replace(/```json|```/g, '').trim();
        // Parse the AI response
        const generatedQuestions = JSON.parse(text);
        console.log("generated questions by ai ",generatedQuestions)
        // Create and save questions in the database
        const savedQuestions = await Promise.all(
            generatedQuestions.map(async (q) => {
                const questionObj = new Question({
                    category: [category.title],
                    questionText: q.questionText,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    hint: q.hint,
                    level: difficulty,
                    marks: 1
                });
                return await questionObj.save();
            })
        );

        return savedQuestions;
    } catch (error) {
        console.error("Error generating questions:", error);
        throw error;
    }
}