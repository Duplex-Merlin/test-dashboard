import React, { useEffect, PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isTokenValid } from "../authentificate";
import { getTenant } from "../../utils/common";

export default function AuthMiddleware({ children }: PropsWithChildren<{}>) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const inLoginPage = location.pathname === "/";
    const isAuthenticated = isTokenValid();
    if (getTenant() && !isAuthenticated) {
      navigate("/login");
    } else if (!isAuthenticated) {
      navigate("/");
      // window.location.assign(`${process.env.REACT_APP_HOME}`);
    }
    if (isAuthenticated && inLoginPage && getTenant()) {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
}
