import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/auth/auth.pages";
import AuthMiddleware from "./core/middleware/auth-middleware";
import { AuthProvider } from "./core/context/auth-context";
import HomePage from "./pages/home/home.page";
import "react-toastify/dist/ReactToastify.css";
import UserPage from "./pages/user/user.page";
import CategoryPage from "./pages/category/category.page";
import ArticlePage from "./pages/articles/article.page";
import NewArticlePage from "./pages/articles/new-article";
import LogsPage from "./pages/logs/logs.page";
import NotFound from "./pages/404/not-found.page";
import StartPage from "./pages/start/start.page";

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <AuthMiddleware>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/dashboard/category" element={<CategoryPage />} />
              <Route
                path="/dashboard/new-articles"
                element={<NewArticlePage />}
              />
              <Route path="/dashboard/articles" element={<ArticlePage />} />
              <Route path="/dashboard/users" element={<UserPage />} />
              <Route path="/dashboard/logs" element={<LogsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </AuthMiddleware>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
