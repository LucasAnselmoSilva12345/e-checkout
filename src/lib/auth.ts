export type User = {
  id: string;
  email: string;
  name?: string;
};

const STORAGE_KEY = 'mock_user';

export function login(email: string, password: string): User {
  const mockUser: User = {
    id: '1',
    email,
    name: 'John Doe',
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  return mockUser;
}

export function signup(email: string, password: string, name?: string): User {
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
}

export function getCurrentUser(): User | any {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
