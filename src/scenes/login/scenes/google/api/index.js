import fetch from 'api';

export default {
  async fetchToken(code, state) {
    try {
      const params = { code, state };
      const response = await fetch('/login/google', { method: 'POST', body: JSON.stringify(params) });
      return { token: response.access_token };
    } catch (error) {
      return { error };
    }
  },
};
