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
import Cookies from "js-cookie";
import { LANG } from "../entities/contant";
import { isEmpty, isNil } from "lodash";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  signOut: () => {},
  setUser: (item: User) => {},
  currentUser: {} as User | null,
  t: (arg: any) => "",
  lang: "en",
  changeLanguage: (arg: string) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    currentUserFromCookies()
  );
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>(
    !isNil(currentLang()) ? currentLang() : "en"
  );
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(currentUserFromCookies());
    i18n.changeLanguage(currentLang());
  }, []);

  const signOut = () => {
    removeUserFromCookies();
    navigate("/admin/auth");
  };

  const setUser = useCallback((item: User) => {
    const user = currentUserFromCookies();
    setCurrentUser(user);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(i18n.language);
    Cookies.set(LANG, lng);
  };

  const value = {
    currentUser,
    signOut,
    setUser,
    t,
    lang,
    changeLanguage,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);
