export async function shortenUrl(longUrl) {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    if (!res.ok) throw new Error("Failed to shorten URL");
    return await res.text();
  }
  