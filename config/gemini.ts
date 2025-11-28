// gemini.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

// تأكد من أن مفتاح API موجود في متغيرات البيئة
// 🚨 تم تحديث اسم المتغير إلى NEXT_PUBLIC_GEMINI_API
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API; 

if (!GOOGLE_API_KEY) {
  // 🚨 تم تحديث رسالة الخطأ لتعكس اسم المتغير الجديد
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API environment variable"); 
}

// تهيئة GoogleGenerativeAI باستخدام مفتاح الـ API
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// دالة لجلب رد من Gemini
export async function getGeminiResponse(prompt: string): Promise<string> {
  // 🚨 التعديل هنا: استخدام gemini-pro بدلاً من gemini-1.5-flash لحل مشكلة 404
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}