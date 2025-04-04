import { transcribe } from 'orate';
import { AssemblyAI } from 'orate/assembly';
import { createAPIRoute } from '@tanstack/react-start/api'
import { aiType } from '@/types/types';
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const assembly = new AssemblyAI();

export const APIRoute = createAPIRoute('/api/transcribe')({
  POST: async ({ request }) => {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File

    const text = await transcribe({
      model: assembly.stt(),
      audio: audioFile,
    })

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

export const AIRoute = createAPIRoute('/api/analyse')({
  POST: async ({ request }) => {
    const data = aiType.safeParse(await request.formData());

    if (!data.success) {
      return new Response(JSON.stringify({ error: data.error || "Validation Failed" }))
    }

    const { model, text } = data.data;

    const res = await generateText({
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

    return new Response(JSON.stringify({ analysis: res }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
