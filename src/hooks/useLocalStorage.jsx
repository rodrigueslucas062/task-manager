import { useEffect, useState } from 'react';

const isServer = typeof window === 'undefined';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => initialValue);

  const initialize = () => {
    if (isServer) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
  }, [])

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue]
}