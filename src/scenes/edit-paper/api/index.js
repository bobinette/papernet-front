import fetch from 'api';
import qs from 'qs';

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

  async checkDriveAccess(token) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const url = '/google/drive';
      const response = await fetch(url, { method: 'GET', headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  async requireDrive(token, currentURL) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const url = `/google/drive/require?${qs.stringify({ fromURL: currentURL }, { skipNulls: true })}`;
      const response = await fetch(url, { method: 'GET', headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};
