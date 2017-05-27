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
};
