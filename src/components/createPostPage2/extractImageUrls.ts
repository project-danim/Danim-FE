function extractImageUrls(htmlString: string): string[] {
  const regex = /<img[^>]+src="(http[^">]+)"/g;
  const urls = [];
  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

export default extractImageUrls;
