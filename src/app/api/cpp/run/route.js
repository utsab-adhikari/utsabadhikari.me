// app/api/cpp/run/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ status: "error", error: "No code provided" }, { status: 400 });
    }

    // Judge0 API endpoint
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: 54, // C++17
      }),
    });

    const result = await response.json();

    // Judge0 API returns stdout, stderr, compile_output
    let output = "";
    if (result.stdout) output = result.stdout;
    else if (result.compile_output) output = `Compile error:\n${result.compile_output}`;
    else if (result.stderr) output = `Runtime error:\n${result.stderr}`;
    else output = "No output";

    return NextResponse.json({ status: "success", output });
  } catch (err) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}
