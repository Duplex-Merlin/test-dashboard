"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  currentUserFromCookies,
  removeUserFromCookies,
} from "../../utils/common";
import { User } from "../entities/user";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  signOut: () => {},
  setUser: (item: User) => {},
  currentUser: {} as User | null,
});

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    currentUserFromCookies()
  );
  const navigate = useNavigate();

  useEffect(() => {
    // const tokenValid = isTokenValid();
    // if (!tokenValid) {
    //   return navigate("/");
    // }
    setCurrentUser(currentUserFromCookies());
  }, []);

  const signOut = () => {
    removeUserFromCookies();
    navigate("/");
  };

  const setUser = useCallback((item: User) => {
    const user = currentUserFromCookies();
    setCurrentUser(user);
  }, []);

  const value = {
    currentUser,
    signOut,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);