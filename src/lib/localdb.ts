/**
 * Tiny IndexedDB wrapper for browser-local files (songs, covers, GIFs).
 * Everything stays on this device/browser only. Never uploaded anywhere.
 */
const DB_NAME = "five-months-scrapbook";
const DB_VERSION = 1;
export type StoreName = "tracks" | "gifs";

let dbPromise: Promise<IDBDatabase> | null = null;

export function idbAvailable(): boolean {
  return typeof window !== "undefined" && "indexedDB" in window && !!window.indexedDB;
}

function openDb(): Promise<IDBDatabase> {
  if (!idbAvailable()) return Promise.reject(new Error("IndexedDB unavailable"));
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("tracks")) db.createObjectStore("tracks", { keyPath: "id" });
      if (!db.objectStoreNames.contains("gifs")) db.createObjectStore("gifs", { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      dbPromise = null;
      reject(req.error);
    };
  });
  return dbPromise;
}

function run<T>(store: StoreName, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(store, mode);
        const req = fn(tx.objectStore(store));
        req.onsuccess = () => resolve(req.result as T);
        req.onerror = () => reject(req.error);
      }),
  );
}

export const idbGetAll = <T>(store: StoreName) => run<T[]>(store, "readonly", (s) => s.getAll());
export const idbGet = <T>(store: StoreName, key: string) => run<T | undefined>(store, "readonly", (s) => s.get(key));
export const idbPut = <T>(store: StoreName, value: T) => run<IDBValidKey>(store, "readwrite", (s) => s.put(value));
export const idbDelete = (store: StoreName, key: string) => run<undefined>(store, "readwrite", (s) => s.delete(key));

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
