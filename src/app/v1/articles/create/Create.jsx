"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Save, Upload } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

export default function CreateArticle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "general",
    content: "",
    publishType: "draft",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-generate slug
  useEffect(() => {
    if (!slugEdited && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, slugEdited]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "slug") {
      setSlugEdited(true);
    }
  };

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        featuredImage: imageUrl,
      };

      const res = await axios.post("/api/v1/articles/create", payload);

      if (res.data.success) {
        setSuccess(res.data.message);
        setTimeout(() => {
          router.push(`/v1/articles/${res.data.article.slug}`);
        }, 1500);
      } else {
        setError(res.data.message || "Failed to create article");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
      console.error("Article creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 text-[#f0f6fc]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
        </div>

        <div className="bg-[#161b22] p-4 md:p-6 rounded-md border border-[#30363d]">
          <h1 className="text-xl font-semibold mb-6 text-center">Create New Article</h1>

          {(error || success) && (
            <div
              className={`mb-4 p-3 rounded-md text-center text-sm ${
                error
                  ? "bg-[#da3633]/20 text-[#f0f6fc] border border-[#da3633]"
                  : "bg-[#196c2e]/20 text-[#f0f6fc] border border-[#3fb950]"
              }`}
            >
              {error || success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#1f6feb] outline-none text-sm"
                placeholder="Enter article title"
                required
                disabled={loading}
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#1f6feb] outline-none text-sm"
                placeholder="article-url-slug"
                required
                disabled={loading}
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Featured Image</label>
              <ImageUploader onUpload={handleImageUpload} />
              {imageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-[#7d8590] mb-2">Preview:</p>
                  <img src={imageUrl} alt="Preview" className="rounded-md border border-[#30363d] max-h-48 object-cover w-full" />
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#1f6feb] outline-none text-sm"
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

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#1f6feb] outline-none text-sm"
                placeholder="Write your article here..."
                required
                disabled={loading}
              ></textarea>
            </div>

            {/* Publish Options */}
            <div>
              <label className="block text-sm font-medium mb-2">Publish Status</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publishType"
                    value="draft"
                    checked={formData.publishType === "draft"}
                    onChange={handleChange}
                    className="mr-2"
                    disabled={loading}
                  />
                  <span className="flex items-center text-sm">
                    <Save size={14} className="mr-1" /> Draft
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publishType"
                    value="published"
                    checked={formData.publishType === "published"}
                    onChange={handleChange}
                    className="mr-2"
                    disabled={loading}
                  />
                  <span className="flex items-center text-sm">
                    <Upload size={14} className="mr-1" /> Publish
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                onClick={() => setFormData((prev) => ({ ...prev, publishType: "draft" }))}
                disabled={loading}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
                  loading 
                    ? "bg-[#21262d] text-[#7d8590] cursor-not-allowed" 
                    : "bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] border border-[#30363d]"
                }`}
              >
                <Save size={16} className="mr-2" />
                {loading ? "Saving..." : "Save Draft"}
              </button>
              <button
                type="submit"
                onClick={() => setFormData((prev) => ({ ...prev, publishType: "published" }))}
                disabled={loading}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
                  loading 
                    ? "bg-[#238636] text-[#7d8590] cursor-not-allowed" 
                    : "bg-[#238636] hover:bg-[#2ea043] text-[#f0f6fc]"
                }`}
              >
                <Upload size={16} className="mr-2" />
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}