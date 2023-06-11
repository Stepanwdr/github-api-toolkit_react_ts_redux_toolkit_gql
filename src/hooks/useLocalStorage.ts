import { useState, useEffect } from 'react';

const  useLocalStorage=<T>(key: string, initialValue: T): [T, (value: T) => void, () => T, () => void] =>{
    const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving data from localStorage: ${error}`);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing data in localStorage: ${error}`);
    }
  };

  const getValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving data from localStorage: ${error}`);
      return initialValue;
    }
  };
  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing data from localStorage: ${error}`);
    }
  };
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing data from localStorage: ${error}`);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [initialValue, key]);

  return [storedValue, setValue, getValue,removeValue];
}

export default useLocalStorage;
