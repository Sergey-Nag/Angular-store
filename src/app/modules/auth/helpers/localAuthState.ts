import { User } from "@shared/models/user.model";

const AUTH_STATE_KEY = 'user-data';

const setlocalAuthState = (user: User) =>
  localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(user));

const getLocalAuthState = (): User | null => {
  const userItem = localStorage.getItem(AUTH_STATE_KEY);

  if (!userItem) return null;

  const user = new User(JSON.parse(userItem));

  return user;
}

const removeLocalAuthState = () =>
  localStorage.removeItem(AUTH_STATE_KEY);

export { setlocalAuthState, getLocalAuthState, removeLocalAuthState };