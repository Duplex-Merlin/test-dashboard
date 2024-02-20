import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      auth: {
        title: "Authentication",
        email_address: "E-mail address",
        email: "Email",
        password: "Password",
        english: "English",
        french: "French",
      },
      sidebar: {
        dashboard: "Dashboard",
        news: "News",
        write_news: "Write News",
        list_news: "List News",
        users: "Users",
        logs: "Logs",
      },
      home: {
        card: {
          one: "News",
          two: "Views",
          tree: "Total simulations",
          four: "Users",
        },
        chart: {
          one: {
            title: "Website view Per Day",
            description:
              "This graph shows the number of views of our website each day.",
          },
          two: {
            title: "Website View Per Month",
            description:
              "This chart shows the number of views our website receives each month.",
          },
        },
      },
      actions: {
        login: "Login",
      },
    },
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      auth: {
        title: "Authentification",
        email_address: "Adresse email",
        email: "Email",
        password: "Mot de passe",
        english: "Anglais",
        french: "Français",
      },
      sidebar: {
        dashboard: "Tableau de bord",
        news: "Articles",
        write_news: "Écrire un article",
        list_news: "Listes des articles",
        users: "Utilisateurs",
        logs: "Journaux",
      },
      home: {
        card: {
          one: "Articles",
          two: "Vues",
          tree: "Simulations totales",
          four: "Utilisateurs",
        },
        chart: {
          one: {
            title: "Consultation du site Web par jour",
            description:
              "Ce graphique montre le nombre de vues de notre site web chaque jour.",
          },
          two: {
            title: "Consultation du site Web par mois",
            description:
              "Ce graphique montre le nombre de vues de notre site web chaque mois.",
          },
        },
      },
      actions: {
        login: "Connexion",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
