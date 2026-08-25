export default defineBackground(() => {
  browser.browserAction.onClicked.addListener(async (tab) => {
    if (!tab.id) return;

    try {
      // Request content script to parse current page
      const response = await browser.tabs.sendMessage(tab.id, { action: 'PARSE_ARTICLE' });

      if (response?.success && response.article) {
        // Store article in local storage
        await browser.storage.local.set({ activeArticle: response.article });

        // Open dedicated reader entrypoint page
        await browser.tabs.create({
          url: browser.runtime.getURL('reader.html'),
        });
      }
    } catch (err) {
      console.error('Failed to trigger reader mode:', err);
    }
  });
});
