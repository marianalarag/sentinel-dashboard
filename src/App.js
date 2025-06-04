import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";

import Login from "./log/Login";
import SignUp from "./log/SignUp";
import ForgotPassword from "./log/ForgotPassword";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Detectar si es una pantalla pública
  const publicRoutes = ["/", "/signup", "/forgot-password"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Detectar usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {!isPublicRoute && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isPublicRoute && <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Rutas protegidas */}
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/team" element={user ? <Team /> : <Navigate to="/" />} />
              <Route path="/contacts" element={user ? <Contacts /> : <Navigate to="/" />} />
              <Route path="/invoices" element={user ? <Invoices /> : <Navigate to="/" />} />
              <Route path="/form" element={user ? <Form /> : <Navigate to="/" />} />
              <Route path="/bar" element={user ? <Bar /> : <Navigate to="/" />} />
              <Route path="/pie" element={user ? <Pie /> : <Navigate to="/" />} />
              <Route path="/line" element={user ? <Line /> : <Navigate to="/" />} />
              <Route path="/faq" element={user ? <FAQ /> : <Navigate to="/" />} />
              <Route path="/calendar" element={user ? <Calendar /> : <Navigate to="/" />} />
              <Route path="/geography" element={user ? <Geography /> : <Navigate to="/" />} />

              {/* Ruta no encontrada */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
