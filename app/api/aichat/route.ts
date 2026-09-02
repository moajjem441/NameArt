import { NextResponse } from "next/server";
import Groq from "groq-sdk";


export async function POST(req: Request) {
  
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: "GROQ_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }


    const groq = new Groq({ apiKey });
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Always reply concisely in clear English.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "openai/gpt-oss-120b",
    });


    const reply = completion.choices[0]?.message?.content || "No response generated.";


    return NextResponse.json({ reply });
  } catch (error: any)
  
  {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { reply: "An error occurred while fetching the response." },
      { status: 500 }
    );
  }
}