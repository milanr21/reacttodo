export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log('The localStorage error is', error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedStore = localStorage.getItem(key);

    if (serializedStore) {
      return JSON.parse(serializedStore);
    }

    return [];
  } catch (error) {
    console.log('The localStorage error is', error);
    return [];
  }
};
