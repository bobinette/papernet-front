import fetch from 'api';
import qs from 'qs';

export default {
  async uploadFile(token, filename, filetype, data) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const body = {
        filename,
        filetype: filetype || 'text/plain',
        data,
      };
      const response = await fetch('/google/drive/files', { method: 'POST', body: JSON.stringify(body), headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  async listFiles(token, name) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const url = `/google/drive/files?${qs.stringify({ name }, { skipNulls: true })}`;
      const response = await fetch(url, { method: 'GET', headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};
