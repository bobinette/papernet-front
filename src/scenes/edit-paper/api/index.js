import fetch from 'api';

export default {
  async fetchPaper(token, id) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const url = `/paper/v2/papers/${id}`;
      const response = await fetch(url, { method: 'GET', headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  async requireDrive(token) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const url = '/google/drive/require';
      const response = await fetch(url, { method: 'GET', headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};
