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
  currentLang,
  currentUserFromCookies,
  removeUserFromCookies,
} from "../../utils/common";
import { User } from "../entities/user";
import { useTranslation } from "react-i18next";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  signOut: () => {},
  setUser: (item: User) => {},
  currentUser: {} as User | null,
  t: (arg: any) => "",
});

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    currentUserFromCookies()
  );
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // const tokenValid = isTokenValid();
    // if (!tokenValid) {
    //   return navigate("/");
    // }
    setCurrentUser(currentUserFromCookies());
    const lang = currentLang();
    i18n.changeLanguage(lang);
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
    t,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);
