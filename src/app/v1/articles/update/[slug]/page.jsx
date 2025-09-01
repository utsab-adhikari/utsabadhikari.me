"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiSave,
  FiUpload,
  FiEdit2,
  FiImage,
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiCode,
  FiType,
  FiLink
} from "react-icons/fi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

export default function UpdateArticle() {
  const router = useRouter();
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [article, setArticle] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "general",
    content: "",
    publishType: "draft",
  });

  // TIPTAP editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: formData.content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-[#c9d1d9]",
      },
    },
  });

  // Fetch article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/api/v1/articles/${slug}`);
        if (res.data.success) {
          const art = res.data.article;
          setArticle(art);
          setFormData({
            title: art.title,
            slug: art.slug,
            category: art.category || "general",
            content: art.content,
            publishType: art.publishType || "draft",
          });

          // Update editor content after fetch
          if (editor) {
            editor.commands.setContent(art.content || "");
          }

          setImageUrl(art.featuredImage || "");
        } else {
          setError(res.data.message || "Failed to load article");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error fetching article"
        );
      } finally {
        setFetching(false);
      }
    };
    fetchArticle();
  }, [slug, editor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUrl = URL.createObjectURL(file);
    setImageUrl(mockUrl);
    setShowImageUpload(false);
    setLoading(false);
  };

  const handleSubmit = async (e, publishType) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        publishType,
        featuredImage: imageUrl,
        id: article?._id,
      };

      const res = await axios.put(`/api/v1/articles/${slug}`, payload);

      if (res.data.success) {
        setSuccess("Article updated successfully!");
        setTimeout(() => {
          router.push(`/articles/${res.data.article.slug}`);
        }, 1500);
      } else {
        setError(res.data.message || "Failed to update article");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
      console.error("Article update error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3fb950]"></div>
        <p className="ml-4 text-[#c9d1d9]">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-[#f0f6fc]">Update Article</h1>
        <div className="w-6"></div>
      </div>

      <div className="max-w-4xl mx-auto bg-[#161b22] p-6 sm:p-8 rounded-lg border border-[#30363d] shadow-lg">
        {(error || success) && (
          <div
            className={`mb-6 p-4 rounded-lg text-center ${
              error
                ? "bg-[#da3633] bg-opacity-20 text-[#f85149] border border-[#f85149]"
                : "bg-[#3fb950] bg-opacity-20 text-[#3fb950] border border-[#3fb950]"
            }`}
          >
            {error || success}
          </div>
        )}

        <form
          onSubmit={(e) => handleSubmit(e, formData.publishType)}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent outline-none text-[#c9d1d9]"
              placeholder="Enter article title"
              required
              disabled={loading}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent outline-none text-[#c9d1d9]"
              placeholder="article-slug"
              required
              disabled={loading}
            />
            <p className="text-xs text-[#8b949e] mt-1">
              This will be used in the article URL.
            </p>
          </div>

          {/* Featured Image */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#f0f6fc]">
                Featured Image
              </label>
              <button
                type="button"
                onClick={() => setShowImageUpload(!showImageUpload)}
                className="flex items-center text-sm text-[#58a6ff] hover:text-[#79c0ff]"
              >
                <FiEdit2 className="mr-1" />{" "}
                {imageUrl ? "Change Image" : "Add Image"}
              </button>
            </div>

            {showImageUpload && (
              <div className="mb-4 p-4 bg-[#0d1117] border border-[#30363d] rounded-md">
                <label className="flex items-center justify-center px-4 py-2 bg-[#21262d] border border-[#30363d] rounded-md cursor-pointer hover:bg-[#30363d] transition-colors">
                  <FiUpload className="mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
                <p className="text-xs text-[#8b949e] mt-2">
                  Supported formats: JPG, PNG, WebP. Max size: 5MB.
                </p>
              </div>
            )}

            {imageUrl && (
              <div className="mt-3">
                <div className="flex items-center mb-2">
                  <FiImage className="mr-2 text-[#8b949e]" />
                  <span className="text-sm text-[#8b949e]">Current Image:</span>
                </div>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="rounded-md border border-[#30363d] max-h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent outline-none text-[#c9d1d9]"
              required
              disabled={loading}
            >
              <option value="ai">AI</option>
              <option value="development">Development</option>
              <option value="tech">Tech</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
              <option value="general">General</option>
              <option value="national">National</option>
            </select>
          </div>

          {/* Content (Tiptap) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#f0f6fc]">
                Content *
              </label>
              {editor && (
                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded-md ${
                      editor.isActive("bold")
                        ? "bg-[#1f6feb] text-white"
                        : "bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                    }`}
                  >
                    <FiBold size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-md ${
                      editor.isActive("italic")
                        ? "bg-[#1f6feb] text-white"
                        : "bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                    }`}
                  >
                    <FiItalic size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded-md ${
                      editor.isActive("bulletList")
                        ? "bg-[#1f6feb] text-white"
                        : "bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                    }`}
                  >
                    <FiList size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`p-2 rounded-md ${
                      editor.isActive("code")
                        ? "bg-[#1f6feb] text-white"
                        : "bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                    }`}
                  >
                    <FiCode size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt("URL");
                      if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                      }
                    }}
                    className={`p-2 rounded-md ${
                      editor.isActive("link")
                        ? "bg-[#1f6feb] text-white"
                        : "bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                    }`}
                  >
                    <FiLink size={16} />
                  </button>
                </div>
              )}
            </div>
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] min-h-[300px] overflow-hidden">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Publish Options */}
          <div className="pt-4 border-t border-[#30363d]">
            <label className="block text-sm font-medium mb-4 text-[#f0f6fc]">
              Publish Status
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="publishType"
                  value="draft"
                  checked={formData.publishType === "draft"}
                  onChange={handleChange}
                  className="mr-2 text-[#58a6ff] focus:ring-[#58a6ff]"
                  disabled={loading}
                />
                <span className="flex items-center text-[#c9d1d9]">
                  <FiSave className="mr-1" /> Save as Draft
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="publishType"
                  value="published"
                  checked={formData.publishType === "published"}
                  onChange={handleChange}
                  className="mr-2 text-[#58a6ff] focus:ring-[#58a6ff]"
                  disabled={loading}
                />
                <span className="flex items-center text-[#c9d1d9]">
                  <FiUpload className="mr-1" /> Publish Now
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-[#30363d]">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() =>
                setFormData((prev) => ({ ...prev, publishType: "draft" }))
              }
              disabled={loading}
              className="flex-1 px-4 py-3 bg-[#238636] text-white hover:bg-[#2ea043] rounded-md transition-colors flex items-center justify-center"
            >
              <FiSave className="mr-2" />
              {loading ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="submit"
              onClick={() =>
                setFormData((prev) => ({ ...prev, publishType: "published" }))
              }
              disabled={loading}
              className="flex-1 px-4 py-3 bg-[#1f6feb] text-white hover:bg-[#388bfd] rounded-md transition-colors flex items-center justify-center"
            >
              <FiUpload className="mr-2" />
              {loading ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}