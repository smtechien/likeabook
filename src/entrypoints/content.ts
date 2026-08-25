import { Readability } from '@mozilla/readability';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.action === 'PARSE_ARTICLE') {
        // Clone document because Readability mutates the DOM tree during parsing
        const docClone = document.cloneNode(true) as Document;
        const reader = new Readability(docClone);
        const article = reader.parse();
        console.log(article);

        if (article) {
          sendResponse({ success: true, article });
        } else {
          sendResponse({ success: false, error: 'Could not extract article content.' });
        }
      }
      return true; // Keeps response channel open for async handler
    });
  },
});
