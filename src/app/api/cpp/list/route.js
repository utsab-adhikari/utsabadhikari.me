
import connectDB from "@/db/ConnectDB";
import CppFile from "@/models/cppFileModel";

export async function GET() {
  await connectDB();
  try {
    const files = await CppFile.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(files), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
