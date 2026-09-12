import type { IUser } from "../types/IUser";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const getUsers = (): IUser[] => {
  const usersText = localStorage.getItem("users");
  if (!usersText) {
    return [];
  }
  return JSON.parse(usersText);
};

export const saveUsers = (users: IUser[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};
