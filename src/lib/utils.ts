export function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/\s]+)/
  );
  return match ? match[1] : null;
}
