import fetch from 'api';
import qs from 'qs';

export default {
  async search(q, limit, offset, sources) {
    try {
      const url = `/imports/v2/search?${qs.stringify({ q, limit, offset, sources }, { skipNulls: true })}`;
      const response = await fetch(url, { method: 'GET' });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};
