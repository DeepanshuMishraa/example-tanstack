import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { auth } from "./auth";
import { db } from "@/db";
import { exercises, user } from "@/db/schema";
import { getHeaders } from "@tanstack/react-start/server";

export const AnalyseText = createServerFn({
  method: 'POST',
  response: 'data',
}).validator((data) => {
  // if (!(data instanceof FormData)) {
  //   throw new Error('Invalid data type');
  // }

  const text = data;

  if (!text) {
    throw new Error('Text is required');
  }

  return {
    text: text.toString(),
  }
}).handler(async ({ data: { text } }) => {
  // better - auth.session_token

  const session = await auth.api.getSession({
    headers: await getHeaders() as any,
  })

  if (!session?.user) {
    throw new Error('Not authenticated');
  }
  console.log("Determining action....");
  console.log(text);

  const model = "llama-3.3-70b-versatile";

  const startTime = Date.now();
  const response = await generateText({
    model: groq(model),
    prompt: `You are an AI that converts casual fitness logs into structured data. 
      Given this log: "${text}"
      
      Create a one-line summary in this exact format:
      [TIME_OF_DAY] | Exercise: {exercises with reps} ({estimated calories burned}) | Food: {foods with nutrition} ({total calories}) | Duration: {extracted or estimated duration}
      
      Example input: "hey today i did 3 pushups and ate a banana and it felt good"
      Example output: "TODAY | Exercise: Pushups x3 (9 cal) | Food: Banana (105 cal, 27g carbs, 1.3g protein) | Duration: 2 mins"
      
      Rules:
      1. Always extract or estimate time/duration
      2. Include calorie estimates for both exercise and food
      3. Include basic nutrition for foods
      4. Keep it in exactly one line
      5. Use the exact format with | separators`,
  });

  await db.insert(exercises).values({
    userId: session?.user.id,
    info: response.text,
    time: new Date(),
    id: crypto.randomUUID(),
  })

  console.log(response.text);
  console.log(`Action determined in ${Date.now() - startTime}ms`);
  return { response: response.text, time: Date.now() - startTime };
})
