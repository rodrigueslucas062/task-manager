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


// import { useEffect, useState } from "react"

// export function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(initialValue)

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       try {
//         const item = localStorage.getItem(key)
//         setStoredValue(item ? JSON.parse(item) : initialValue)
//       } catch (error) {
//         console.warn(error)
//         setStoredValue(initialValue)
//       }
//     }
//   }, [key, initialValue])

//   const setValue = (value) => {
//     try {
//       const ValueToStore =
//         typeof value === "function" ? value(storedValue) : value
//       setStoredValue(ValueToStore)
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(ValueToStore))
//       }
//     } catch (error) {
//       console.warn(error)
//     }
//   }
//   return [storedValue, setValue]
// }