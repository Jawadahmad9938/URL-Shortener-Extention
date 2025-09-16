export async function shortenUrl(longUrl) {
    const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`);
    if (!res.ok) throw new Error("Failed to shorten URL");
    return await res.text();
  }
  