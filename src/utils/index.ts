export const setLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const getLocalStorage = (key: string) => {
  try {
    // return JSON.parse(localStorage.getItem(key) ?? "");
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
