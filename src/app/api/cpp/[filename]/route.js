
import connectDB from "@/db/ConnectDB";
import CppFile from "@/models/cppFileModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req, { params }) {
  await connectDB();
  const {filename} = await params;

  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Admin access required" }),
        { status: 401 }
      );
    }

    const { filename, description, code } = await req.json();
    
    // Validate input
    if (!filename || !code) {
      return new Response(
        JSON.stringify({ error: "Filename and code are required" }),
        { status: 400 }
      );
    }
    
    // Check if file exists
    const existingFile = await CppFile.findOne({ filename: filename });
    if (!existingFile) {
      return new Response(
        JSON.stringify({ error: "File not found" }),
        { status: 404 }
      );
    }
    
    // Update the file
    const updatedFile = await CppFile.findOneAndUpdate(
      { filename: params.filename },
      { 
        filename, 
        description: description || "", 
        code,
        // This will automatically update the updatedAt field
      },
      { new: true, runValidators: true }
    );
    
    return new Response(JSON.stringify(updatedFile), { status: 200 });
  } catch (err) {
    console.error("Update error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 }
    );
  }
}


export async function GET(req, { params }) {
  await connectDB();
  const {filename} = await params;
  try {
    const file = await CppFile.findOne({ filename: filename });
    if (!file) {
      return new Response(JSON.stringify({ error: "File not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(file), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Admin access required" }),
        { status: 401 }
      );
    }
    
    const deletedFile = await CppFile.findOneAndDelete({ filename: params.filename });
    
    if (!deletedFile) {
      return new Response(
        JSON.stringify({ error: "File not found" }),
        { status: 404 }
      );
    }
    
    return new Response(
      JSON.stringify({ message: "File deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 }
    );
  }
}
