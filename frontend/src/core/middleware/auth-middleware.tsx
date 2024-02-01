import React, { useEffect, PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isTokenValid } from "../authentificate";

export default function AuthMiddleware({ children }: PropsWithChildren<{}>) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const inLoginPage = location.pathname === "/";
    const isAuthenticated = isTokenValid();
    
    if (!isAuthenticated) {
      navigate("/");
    }
    if (isAuthenticated && inLoginPage) {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
}