"use client";

import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import cpp from "highlight.js/lib/languages/cpp";
import "highlight.js/styles/github-dark.css"; // dark theme

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("cpp", cpp);

export default function PublicTrackerNotes({ editorContent }) {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);

      // Optional: Add copy button
      if (!block.parentElement.querySelector(".copy-btn")) {
        const btn = document.createElement("button");
        btn.textContent = "Copy";
        btn.className =
          "copy-btn absolute top-2 right-2 bg-[#21262d] text-[#7d8590] px-2 py-1 rounded text-xs hover:bg-[#30363d] hover:text-[#f0f6fc]";
        btn.onclick = () => navigator.clipboard.writeText(block.textContent);
        block.parentElement.style.position = "relative";
        block.parentElement.appendChild(btn);
      }
    });
  }, [editorContent]);

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <h2 className="text-lg font-semibold text-[#f0f6fc] border-b border-[#30363d] pb-2">
        Notes
      </h2>
      <article
        className="prose prose-invert max-w-none leading-relaxed whitespace-pre-wrap text-[#f0f6fc] prose-headings:text-[#f0f6fc] prose-a:text-[#2f81f7] prose-strong:text-[#f0f6fc] prose-code:text-[#f0f6fc] prose-code:bg-[#161b22] prose-code:p-1 prose-code:rounded prose-code:border prose-code:border-[#30363d]"
        dangerouslySetInnerHTML={{ __html: editorContent }}
      />
      <style jsx>{`
        pre {
          background: #0d1117;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          border: 1px solid #30363d;
        }
        pre code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}