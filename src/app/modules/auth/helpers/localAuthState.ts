import { User } from "@shared/models/user.model";

const setlocalAuthState = (user: User) =>
  localStorage.setItem('user-data', JSON.stringify(user));

const getLocalAuthState = (): User | null => {
  const userItem = localStorage.getItem('user-data');

  if (!userItem) return null;

  const user = new User(JSON.parse(userItem));

  return user;
}

const removeLocalAuthState = () =>
  localStorage.removeItem('user-data');

export { setlocalAuthState, getLocalAuthState, removeLocalAuthState };