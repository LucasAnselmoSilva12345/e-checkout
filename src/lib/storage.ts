export function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function remove(key: string) {
  localStorage.removeItem(key);
}
