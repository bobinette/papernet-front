import fetch from 'api';

export default {
  async fetchLoginUrl() {
    try {
      return await fetch('/login/google');
    } catch (error) {
      return { error };
    }
  },
};
