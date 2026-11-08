import { API_CONFIG } from './settings.js';
import { generateInitialTasks } from './initial-data-sample.js';

// In-Memory Cache Store
const cacheStore = {
  allTasks: null,
  allTasksTimestamp: 0,
  taskDetails: new Map(), // key: id, value: { data, timestamp }
};

function isCacheValid(timestamp) {
  if (!timestamp) return false;
  return Date.now() - timestamp < API_CONFIG.CACHE_TTL_MS;
}

function clearCache() {
  cacheStore.allTasks = null;
  cacheStore.allTasksTimestamp = 0;
  cacheStore.taskDetails.clear();
}

function getStorageData() {
  const raw = localStorage.getItem(API_CONFIG.STORAGE_KEY);
  if (!raw) {
    const initial = generateInitialTasks();
    localStorage.setItem(API_CONFIG.STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    const initial = generateInitialTasks();
    localStorage.setItem(API_CONFIG.STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

function setStorageData(data) {
  localStorage.setItem(API_CONFIG.STORAGE_KEY, JSON.stringify(data));
  clearCache(); // Invalidate cache on data mutation
}

export const fakeApi = {
  async getAll() {
    return new Promise((resolve, reject) => {
      // 1. Check valid cache
      if (cacheStore.allTasks && isCacheValid(cacheStore.allTasksTimestamp)) {
        resolve([...cacheStore.allTasks]);
        return;
      }

      // 2. Fetch fresh
      setTimeout(() => {
        if (Math.random() < API_CONFIG.ERROR_RATE) {
          reject(new Error('Network error: Unable to load tasks from server.'));
          return;
        }
        const data = getStorageData();
        cacheStore.allTasks = data;
        cacheStore.allTasksTimestamp = Date.now();
        resolve([...data]);
      }, API_CONFIG.DELAY_MS);
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      // 1. Check valid cache
      const cached = cacheStore.taskDetails.get(id);
      if (cached && isCacheValid(cached.timestamp)) {
        resolve({ ...cached.data });
        return;
      }

      // 2. Fetch fresh
      setTimeout(() => {
        if (Math.random() < API_CONFIG.ERROR_RATE) {
          reject(new Error(`Failed to fetch details for task ID: ${id}`));
          return;
        }
        const data = getStorageData();
        const found = data.find((item) => item.id === id);
        if (!found) {
          reject(new Error(`Task "${id}" was not found.`));
        } else {
          cacheStore.taskDetails.set(id, { data: found, timestamp: Date.now() });
          resolve({ ...found });
        }
      }, API_CONFIG.DELAY_MS);
    });
  },

  async create(newItem) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getStorageData();
        const created = {
          ...newItem,
          id: `TASK-${Date.now().toString().slice(-4)}`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        const updated = [created, ...data];
        setStorageData(updated);
        resolve(created);
      }, API_CONFIG.DELAY_MS);
    });
  },

  async update(id, partialData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getStorageData();
        let updatedItem = null;
        const updatedList = data.map((item) => {
          if (item.id === id) {
            updatedItem = { ...item, ...partialData };
            return updatedItem;
          }
          return item;
        });

        if (!updatedItem) {
          reject(new Error(`Task ${id} not found for update.`));
          return;
        }

        setStorageData(updatedList);
        resolve(updatedItem);
      }, API_CONFIG.DELAY_MS);
    });
  },

  async remove(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getStorageData();
        const updated = data.filter((item) => item.id !== id);
        setStorageData(updated);
        resolve({ id });
      }, API_CONFIG.DELAY_MS);
    });
  },

  async resetData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fresh = generateInitialTasks();
        setStorageData(fresh);
        resolve(fresh);
      }, API_CONFIG.DELAY_MS);
    });
  }
};
