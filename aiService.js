//браузер требует либо локальный путь, либо веб-ссылку
import { GoogleGenAI } from "https://esm.sh/@google/genai"; 
//esm.sh - сервер пересобирает то, что передатеся по ссылке в своместимый
//с браузером стандарт (ES modules);
import { AI_MODEL, GEMINI_API_KEY } from "./config.js";

// import "dotenv/config";
// import * as dotenv from "dotenv";
// dotenv.config({
//   path: "../.env",
// });

//браузер не работает с переменными окружения ОС и файлами формата .env.

export async function askAi(prompt) {
  const apiKey = GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(" API key not found");
  }
  const genAi = new GoogleGenAI({
    apiKey,
  });

  const response = await genAi.models.generateContent({
    model: AI_MODEL,
    contents: prompt,
  });

  return response.text;
}
