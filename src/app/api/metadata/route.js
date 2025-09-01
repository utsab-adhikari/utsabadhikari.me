import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "URL missing" }), {
        status: 400,
      });
    }

    // Set user-agent to avoid 403 on some sites
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const metadata = {
      title:
        $("meta[property='og:title']").attr("content") || $("title").text(),
      description:
        $("meta[property='og:description']").attr("content") ||
        $("meta[name='description']").attr("content") ||
        "",
      image: $("meta[property='og:image']").attr("content") || "",
      url,
    };

    return new Response(JSON.stringify(metadata), { status: 200 });
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
      status: 500,
    });
  }
}
