import fetch from 'api';

export default {
  async fetchProviders() {
    try {
      return await fetch('/login/providers');
    } catch (error) {
      return { error };
    }
  },
};
