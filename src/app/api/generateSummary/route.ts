import { NextResponse } from "next/server";

// constants and functions
import openai from "@/config/openai";
import {
  AI_MODEL,
  AI_TEMPERATURE,
  AI_N,
  AI_STREAM,
  AI_SYSTEM_SUMMARY,
  AI_USER_SUMMARY,
} from "@/constants";

export async function POST(request: Request) {
  const { board } = await request.json();

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    temperature: AI_TEMPERATURE,
    n: AI_N,
    stream: AI_STREAM,
    messages: [
      {
        role: "system",
        content: AI_SYSTEM_SUMMARY,
      },
      {
        role: "user",
        content: `${AI_USER_SUMMARY} ${JSON.stringify(board)}`,
      },
    ],
  });

  return NextResponse.json(response.choices[0].message);
}
