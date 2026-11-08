export const API_CONFIG = {
  STORAGE_KEY: 'devtask_hub_tasks_v3',
  DELAY_MS: Number(import.meta.env.VITE_API_DELAY) || 350,
  CACHE_TTL_MS: Number(import.meta.env.VITE_CACHE_TTL_MS) || 60000,
  ERROR_RATE: 0.0,
};
