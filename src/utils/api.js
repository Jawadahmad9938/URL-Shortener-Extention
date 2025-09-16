export async function shortenUrl(longUrl) {
    try {
      // Try is.gd first
      const res1 = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`);
      if (res1.ok) {
        const txt = await res1.text();
        if (txt && txt.startsWith("http")) return txt;
      }
    } catch (err) {
      console.warn("is.gd failed, trying TinyURL");
    }
  
    // Fallback to TinyURL
    const res2 = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    if (!res2.ok) throw new Error("Both APIs failed");
    return await res2.text();
  }
  
  