import React, { useState, useContext } from 'react';
import { api } from '../api';
import { AuthContext } from '../AuthContext';
import { Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export default function Login({ onSwitch }) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data.user, res.data.token);
    } catch {
      setErr('Invalid credentials');
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4, borderRadius: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
            {err && <Typography color="error">{err}</Typography>}
            <Button type="submit" variant="contained" fullWidth>Login</Button>
            <Button onClick={onSwitch} fullWidth color="secondary">Register</Button>
          </Stack>
        </form>
      </Paper>
    </motion.div>
  );
}
