"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";

// Languages
import javascript from "highlight.js/lib/languages/javascript";
import jsonLang from "highlight.js/lib/languages/json";
import cpp from "highlight.js/lib/languages/cpp";

// Register languages
const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("json", jsonLang);
lowlight.register("cpp", cpp);

export default function Editor({ content, onChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // only render editor on client
  }, []);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({ codeBlock: false }),
        Underline,
        Link,
        CodeBlockLowlight.configure({ lowlight, defaultLanguage: "javascript" }),
      ],
      content: content || "",
      editorProps: {
        attributes: {
          className:
            "prose prose-invert max-w-full min-h-[220px] focus:outline-none " +
            "prose-headings:text-[#f0f6fc] prose-p:text-[#c9d1d9] prose-strong:text-white " +
            "prose-code:text-[#f0f6fc] prose-code:bg-[#161b22] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:border prose-code:border-[#30363d] " +
            "prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-[#30363d] prose-pre:rounded-md prose-pre:p-4 " +
            "prose-blockquote:border-l-[#3fb950] prose-blockquote:text-[#8b949e] " +
            "prose-ol:text-[#c9d1d9] prose-ul:text-[#c9d1d9] prose-li:text-[#c9d1d9] " +
            "prose-a:text-[#58a6ff] hover:prose-a:text-[#58a6ff] prose-a:no-underline hover:prose-a:underline",
        },
      },
      onUpdate: ({ editor }) => onChange && onChange(editor.getHTML()),
      immediatelyRender: false, // ❌ must be false for SSR
    },
    [mounted] // only initialize editor when mounted
  );

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64 border border-[#30363d] bg-[#0d1117] rounded-lg">
        <div className="text-[#8b949e]">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="border border-[#30363d] bg-[#0d1117] rounded-lg shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-[#161b22] border-b border-[#30363d]">
        {[
          ["Bold", "bold", () => editor.chain().focus().toggleBold().run()],
          ["Italic", "italic", () => editor.chain().focus().toggleItalic().run()],
          ["Underline", "underline", () => editor.chain().focus().toggleUnderline().run()],
          ["Bullet List", "list-bulleted", () => editor.chain().focus().toggleBulletList().run()],
          ["Numbered List", "list-numbered", () => editor.chain().focus().toggleOrderedList().run()],
          ["Code", "code", () => editor.chain().focus().toggleCode().run()],
          ["Code Block", "code-block", () => editor.chain().focus().toggleCodeBlock().run()],
          ["Heading 2", "h2", () => editor.chain().focus().toggleHeading({ level: 2 }).run()],
          ["Heading 3", "h3", () => editor.chain().focus().toggleHeading({ level: 3 }).run()],
          ["Link", "link", () => {
            const url = window.prompt('URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }],
        ].map(([label, icon, handler]) => (
          <button
            key={label}
            onClick={handler}
            type="button"
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center ${
              editor && editor.isActive(icon) 
                ? 'bg-[#1f6feb] text-white' 
                : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white'
            }`}
            title={label}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="p-4 bg-[#0d1117] min-h-[250px]">
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
}