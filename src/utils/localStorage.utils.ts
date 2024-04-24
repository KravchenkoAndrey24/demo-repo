export enum LOCAL_STORAGE_KEYS {
  CURRENT_USER = 'CURRENT_USER'
}

export const getLocalStorageValue = (key: LOCAL_STORAGE_KEYS) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const removeLocalStorageValue = (key: LOCAL_STORAGE_KEYS) => {
  localStorage.removeItem(key);
};

export const setLocalStorageValue = <T>(key: LOCAL_STORAGE_KEYS, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return null;
  }
};
