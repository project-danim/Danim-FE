function extractImageUrls(htmlString: string): string[] {
  const regex = /<img[^>]+src="(http[^">]+)"/g;
  const urls = [];
  let match = regex.exec(htmlString);
  while (match !== null) {
    urls.push(match[1]);
    match = regex.exec(htmlString);
  }
  return urls;
}

export default extractImageUrls;
