import fetch from 'api';
import qs from 'qs';

export default {
  async fetchList(token, { q, bookmarked, tags }, { limit, offset }) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const url = `/paper/v2/papers?${qs.stringify(
        { q, bookmarked, tags, limit, offset }, { skipNulls: true, indices: false },
      )}`;
      const response = await fetch(url, { method: 'GET', headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};
