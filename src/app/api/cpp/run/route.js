import { exec } from "child_process";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { code } = await req.json();

    // Temporary file path
    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const filePath = path.join(tmpDir, `temp.cpp`);
    const exePath = path.join(tmpDir, `temp.exe`);

    // Save the code to a temporary file
    fs.writeFileSync(filePath, code, "utf8");

    // Compile C++ code
    const compile = await new Promise((resolve, reject) => {
      exec(`g++ "${filePath}" -o "${exePath}"`, (err, stdout, stderr) => {
        if (err) reject(stderr || err.message);
        else resolve(stdout);
      });
    });

    // Run the compiled program
    const output = await new Promise((resolve, reject) => {
      exec(`"${exePath}"`, { timeout: 5000 }, (err, stdout, stderr) => {
        if (err) reject(stderr || err.message);
        else resolve(stdout);
      });
    });

    return new Response(
      JSON.stringify({ status: "success", output }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ status: "error", error: err.toString() }),
      { status: 500 }
    );
  } finally {
    // Cleanup temp files
    try {
      fs.unlinkSync(path.join(process.cwd(), "tmp", "temp.cpp"));
      fs.unlinkSync(path.join(process.cwd(), "tmp", "temp.exe"));
    } catch {}
  }
}
