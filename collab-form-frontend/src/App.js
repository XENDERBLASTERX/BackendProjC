import React, { useContext, useState } from 'react';
import { AuthProvider, AuthContext } from './AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import JoinForm from './components/JoinForm';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import theme from './theme';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your content pages (create these in src/pages/)
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';

// MainApp for authenticated users
function MainApp() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8e24aa 0%, #ce93d8 100%)',
    }}>
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user.role === 'admin'
            ? <AdminDashboard />
            : <JoinForm />}
        </motion.div>
      </Container>
    </Box>
  );
}

// Auth guard for dashboard route
function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected dashboard */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <MainApp />
              </RequireAuth>
            } />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
