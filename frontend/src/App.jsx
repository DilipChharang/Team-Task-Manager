import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MemberDashboard from "./pages/MemberDashboard"; // 👈 NEW
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import Layout from "./components/Layout";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* 🔓 PUBLIC ROUTES */}
      <Route
        path="/"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/dashboard" />}
      />

      {/* 🔐 DASHBOARD (ROLE BASED) */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Layout>
              {user.role === "Admin" ? (
                <Dashboard />
              ) : (
                <MemberDashboard />
              )}
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
  path="/projects"
  element={
    user && user.role === "Admin"
      ? <Layout><Projects /></Layout>
      : <Navigate to="/dashboard" />
  }
/>

<Route
  path="/tasks"
  element={
    user && user.role === "Admin"
      ? <Layout><Tasks /></Layout>
      : <Navigate to="/dashboard" />
  }
/>

      {/* ❌ INVALID ROUTE */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;