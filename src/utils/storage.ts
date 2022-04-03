export const getStorageItem = (key: string) => {
  try {
    const maybeItem = localStorage.getItem(key);
    return maybeItem ? JSON.parse(maybeItem) : null;
  } catch {
    return null;
  }
};

export const setStorageItem = (key: string, value: unknown) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};
