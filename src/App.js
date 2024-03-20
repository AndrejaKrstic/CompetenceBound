import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./components/HomePage";
import PrivateRoute from "./routes/PrivateRoute";
import BlogPage from "./components/BlogPage";
import CompetencesPage from "./components/CompetencesPage";
import "./App.css";
import { useAppContext } from "./AppContext";
import CompetencyModelPage from "./components/CompetencyModelPage";

function App() {
  const { isAuthenticated } =
  useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/connect"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute
              Component={HomePage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/blog"
          element={
            <PrivateRoute
              Component={BlogPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/competences"
          element={
            <PrivateRoute
              Component={CompetencesPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/competency-model"
          element={
            <PrivateRoute
              Component={CompetencyModelPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
