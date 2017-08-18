import fetch from 'api';

export default {
  async signIn(email, password) {
    try {
      const body = { email, password };
      const response = await fetch('/auth/v2/login', { method: 'POST', body: JSON.stringify(body) });
      return { token: response.access_token };
    } catch (error) {
      return { error };
    }
  },
  async signUp(email, password) {
    try {
      const body = { email, password };
      const response = await fetch('/auth/v2/signup', { method: 'POST', body: JSON.stringify(body) });
      return { token: response.access_token };
    } catch (error) {
      return { error };
    }
  },
};
