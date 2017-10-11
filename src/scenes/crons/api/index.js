import fetch from 'api';

export default {
  async fetchCrons(token) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    try {
      const url = '/cron/v1/crons';
      const response = await fetch(url, { method: 'GET', headers });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  async createCron(token, q, sources) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    const body = {
      q,
      sources,
    };

    console.log(JSON.stringify(body));

    try {
      const url = '/cron/v1/crons';
      const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};
