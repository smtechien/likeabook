function parseElement(htmlString: string, tag: string): Element[] | null {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, 'text/html')
  const htmlCollection = Array.from(htmlDoc.querySelectorAll(tag))

  if (htmlCollection.length === 0) {
    return null;
  }

  return htmlCollection;
}

export default parseElement;
