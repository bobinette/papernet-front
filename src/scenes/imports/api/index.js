import fetch from 'api';

export default {
  async importChromeBookmarks(bookmarks) {
    try {
      const response = await fetch('/papernet/imports/chrome-bookmarks', { method: 'POST', body: bookmarks });
      return { papers: response };
    } catch (error) {
      return { error };
    }
  },
};
