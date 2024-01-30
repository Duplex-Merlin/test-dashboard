import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { BEARER_TOKEN } from "./entities/contant";

export const isTokenValid = () => {
  const token = Cookies.get(BEARER_TOKEN);

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
    }
  }

  return false;
};