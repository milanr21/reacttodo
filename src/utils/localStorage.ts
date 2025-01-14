export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, JSON.stringify(serializedState));
  } catch (error) {
    console.log("The localStorage error is", error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedStore = JSON.parse(key);
    localStorage.getItem(JSON.parse(serializedStore));
  } catch (error) {
    console.log("The localStorage error is", error);
  }
};
