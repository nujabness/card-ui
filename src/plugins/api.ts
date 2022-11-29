import type { App, Plugin } from 'vue';
import { inject } from 'vue';
import { ApiClient } from './client/client';
import type { ApiOptions } from './client/client';

// Vue plugin
export const createApiClient = (options?: ApiOptions): Plugin => {
  return {
    install: (app: App) => {
      app.provide('api', new ApiClient(options));
    }
  };
};

export const useApi = () => {
  const api = inject('api') as ApiClient;

  return {
    apiClient: api,
  };
};
