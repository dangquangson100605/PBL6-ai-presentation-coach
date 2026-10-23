import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import StudioPage from "./StudioPage";
import AnalyzingPage from "./AnalyzingPage";
import ReportPage from "./ReportPage";
import HistoryPage from "./HistoryPage";
import AdminPage from "./AdminPage";
import UploadPage from "./UploadPage";
import SettingsPage from "./SettingsPage";
import UsersPage from "./UsersPage";
import AdminSettingsPage from "./AdminSettingsPage";

function AppRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, loginAsStudent, loginAsAdmin, logout } = useAuth();

  const handleNav = (destination: string) => {
    if (destination === "settings" && userRole === "admin") {
      navigate("/admin/settings");
      return;
    }
    if (destination === "users") {
      navigate("/admin/users");
      return;
    }
    if (destination === "config" || destination === "logs") {
      navigate("/admin");
      return;
    }
    const destinationMap: Record<string, string> = {
      dashboard: userRole === "admin" ? "/admin" : "/report",
      studio: "/studio",
      upload: "/upload",
      history: "/history",
      settings: "/settings",
      admin: "/admin",
    };
    navigate(destinationMap[destination] || `/${destination}`);
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <LandingPage
            onLogin={() => navigate("/login")}
            onSignUp={() => navigate("/signup")}
            onAdmin={() => {
              loginAsAdmin();
              navigate("/admin");
            }}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            onBack={() => navigate("/")}
            onSignUp={() => navigate("/signup")}
            onLoginAsStudent={() => {
              loginAsStudent();
              navigate("/studio");
            }}
            onLoginAsAdmin={() => {
              loginAsAdmin();
              navigate("/admin");
            }}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignUpPage
            onBack={() => navigate("/")}
            onLogin={() => navigate("/login")}
            onSignUp={() => {
              loginAsStudent();
              navigate("/studio");
            }}
          />
        }
      />

      {/* Student Protected Routes */}
      <Route
        path="/studio"
        element={
          isAuthenticated ? (
            <StudioPage onNav={handleNav} onAnalyze={() => navigate("/analyzing")} userRole={userRole || "student"} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/upload"
        element={
          isAuthenticated ? (
            <UploadPage onNav={handleNav} onAnalyze={() => navigate("/analyzing")} userRole={userRole || "student"} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/analyzing"
        element={
          isAuthenticated ? (
            <AnalyzingPage onNav={handleNav} onDone={() => navigate("/report")} userRole={userRole || "student"} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/report"
        element={
          isAuthenticated ? (
            <ReportPage onNav={handleNav} userRole={userRole || "student"} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/history"
        element={
          isAuthenticated ? (
            <HistoryPage onNav={handleNav} onViewReport={() => navigate("/report")} userRole={userRole || "student"} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <SettingsPage onNav={handleNav} userRole={userRole || "student"} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          isAuthenticated && userRole === "admin" ? (
            <AdminPage onNav={handleNav} userRole="admin" />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/users"
        element={
          isAuthenticated && userRole === "admin" ? (
            <UsersPage onNav={handleNav} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/settings"
        element={
          isAuthenticated && userRole === "admin" ? (
            <AdminSettingsPage
              onNav={handleNav}
              onLogout={() => {
                logout();
                navigate("/");
              }}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
