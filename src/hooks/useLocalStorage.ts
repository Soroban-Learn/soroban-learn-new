
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (serializer(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`
        );
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;

        window.localStorage.setItem(key, JSON.stringify(newValue));

        setStoredValue(newValue);

        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
  
    // Return a function to remove the event listener
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [handleStorageChange]);

  return [storedValue, setValue];
}

function serializer<T>(value: string | null): T {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    return value as T;
  }
}
