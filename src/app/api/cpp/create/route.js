// app/api/cpp/create/route.js
import connectDB from "@/db/ConnectDB";
import CppFile from "@/models/cppFileModel";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const newFile = await CppFile.create(body);
    return new Response(JSON.stringify(newFile), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}
