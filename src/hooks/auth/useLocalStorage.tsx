import { useState } from 'react';

const useLocalStorage = (keyName: string, defaultValue: string | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: string | null) => {
    try {
      console.log(newValue);
      if (!!newValue) {
        localStorage.setItem(keyName, JSON.stringify(newValue));
      } else {
        localStorage.removeItem(keyName);
      }
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
