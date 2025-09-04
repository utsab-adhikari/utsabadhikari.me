'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/download');
      const data = await res.json();
      if (data.success) setVideos(data.videos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) return setStatus('Please paste a YouTube URL');
    setStatus('Downloading...');
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Downloaded!');
        setUrl('');
        fetchVideos();
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`/api/download/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Download Form */}
        <div className="bg-[#161b22] p-6 rounded-md border border-[#30363d] mb-6 shadow-md">
          <h1 className="text-2xl font-semibold text-[#f0f6fc] mb-4">YouTube → MP3 Downloader</h1>
          <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube link"
              className="flex-1 p-2 rounded bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] text-sm focus:outline-none focus:border-[#58a6ff]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#238636] hover:bg-[#2ea043] text-[#f0f6fc] font-medium py-2 px-4 rounded transition-colors text-sm"
            >
              Download MP3
            </button>
          </form>
          {status && <p className="mt-3 text-[#8b949e] text-sm">{status}</p>}
        </div>

        {/* Saved Videos */}
        <div>
          <h2 className="text-xl font-semibold text-[#f0f6fc] mb-4">Saved Videos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <div
                key={v._id}
                className="bg-[#161b22] border border-[#30363d] rounded-md p-3 hover:bg-[#21262d] transition-colors flex flex-col"
              >
                <img src={v.thumbnail} alt="" className="w-full h-40 object-cover rounded mb-2" />
                <p className="text-[#f0f6fc] text-sm font-medium line-clamp-2 mb-1">{v.title}</p>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] hover:underline text-xs mb-1"
                >
                  View on YouTube
                </a>
                <p className="text-[#8b949e] text-xs mb-2">Saved: {new Date(v.added).toLocaleString()}</p>
                <button
                  onClick={() => handleDelete(v._id)}
                  className="mt-auto w-full bg-[#ff6b6b] hover:bg-[#f85149] text-white py-1 px-2 rounded text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
            {videos.length === 0 && (
              <p className="text-[#8b949e] text-sm col-span-full">No saved videos yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
