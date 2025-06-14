import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Typography, Avatar, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { purple } from '@mui/material/colors';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Features', path: '/features' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' }
];

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(140, 82, 255, 0.1)',
        borderRadius: 0,
        mb: 2,
        py: 1
      }}
    >
      <Toolbar>
        <Avatar
          sx={{
            bgcolor: purple[700],
            mr: 2,
            boxShadow: 2,
            border: '2px solid #fff'
          }}
        >
          C
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: purple[700],
            letterSpacing: 1.5
          }}
        >
          CollabForms
        </Typography>
        {navLinks.map(link => (
          <Button
            key={link.path}
            component={Link}
            to={link.path}
            color={location.pathname === link.path ? 'primary' : 'inherit'}
            sx={{
              mx: 1,
              fontWeight: 600,
              borderBottom: location.pathname === link.path ? '2px solid #8e24aa' : 'none'
            }}
          >
            {link.label}
          </Button>
        ))}
        {!user && (
          <>
            <Button
              component={Link}
              to="/login"
              color={location.pathname === '/login' ? 'primary' : 'inherit'}
              sx={{
                mx: 1,
                fontWeight: 600,
                borderBottom: location.pathname === '/login' ? '2px solid #8e24aa' : 'none'
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              color={location.pathname === '/register' ? 'primary' : 'inherit'}
              sx={{
                mx: 1,
                fontWeight: 600,
                borderBottom: location.pathname === '/register' ? '2px solid #8e24aa' : 'none'
              }}
            >
              Register
            </Button>
          </>
        )}
        {user && (
          <>
            <Button
              component={Link}
              to="/dashboard"
              color={location.pathname === '/dashboard' ? 'primary' : 'inherit'}
              sx={{
                mx: 1,
                fontWeight: 600,
                borderBottom: location.pathname === '/dashboard' ? '2px solid #8e24aa' : 'none'
              }}
            >
              Dashboard
            </Button>
            <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: purple[400], mr: 1 }}>
                {user.username ? user.username[0].toUpperCase() : '?'}
              </Avatar>
              <Typography sx={{ color: purple[900], fontWeight: 600 }}>
                {user.username} ({user.role})
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
              sx={{ ml: 2, fontWeight: 600 }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
