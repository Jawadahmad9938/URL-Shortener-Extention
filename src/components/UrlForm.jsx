import { useState } from "react";
import { shortenUrl } from "../utils/api";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await shortenUrl(url);
      setShortUrl(result);
    } catch (error) {
      setShortUrl("");
      alert("⚠️ Failed to shorten URL. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow">
        
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          🔗 URL Shortener
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center gap-1"
          >
            {loading ? "⏳" : "Shorten"}
          </button>
        </form>

        {/* Result */}
        {shortUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 break-all">{shortUrl}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                alert("✅ Link copied to clipboard!");
              }}
              className="mt-2 w-full py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center gap-2"
            >
              📋 Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
