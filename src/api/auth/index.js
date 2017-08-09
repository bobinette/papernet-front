import fetch from 'api';

export default {
  async fetchUser(token) {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
      });
      const user = await fetch('/auth/v2/me', { headers });
      return { user };
    } catch (error) {
      return { error };
    }
  },
  async bookmark(token, paperId, bookmark) {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
      });

      const body = JSON.stringify({ paperID: paperId, bookmark });
      const user = await fetch('/auth/v2/bookmarks', { method: 'POST', headers, body });
      return { user };
    } catch (error) {
      return { error };
    }
  },
};
