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
      alert("Error shortening URL");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 w-72">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {shortUrl && (
        <div className="mt-3 p-2 border rounded bg-green-50">
          <p className="text-sm break-all">{shortUrl}</p>
          <button
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            className="mt-2 bg-gray-800 text-white px-3 py-1 rounded"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
