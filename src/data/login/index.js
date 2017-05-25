import fetch from 'data';

export default {
  async fetchProviders() {
    try {
      return await fetch('/login/providers');
    } catch (error) {
      return { error };
    }
  },
};
