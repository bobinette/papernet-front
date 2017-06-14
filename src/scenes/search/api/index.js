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
  async importPaper(token, paper) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await fetch(
        '/imports/v2/import',
        { method: 'POST', headers, body: JSON.stringify(paper.toJS()) },
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};
