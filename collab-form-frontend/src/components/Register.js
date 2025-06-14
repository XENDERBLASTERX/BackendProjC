import React, { useState, useContext } from 'react';
import { api } from '../api';
import { AuthContext } from '../AuthContext';
import { Button, TextField, Typography, Select, MenuItem, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export default function Register({ onSwitch }) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/register', { username, password, role });
      login(res.data.user, res.data.token);
    } catch {
      setErr('Registration failed');
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4, borderRadius: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
            <Select value={role} onChange={e => setRole(e.target.value)} fullWidth>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {err && <Typography color="error">{err}</Typography>}
            <Button type="submit" variant="contained" fullWidth>Register</Button>
            <Button onClick={onSwitch} fullWidth color="secondary">Back to Login</Button>
          </Stack>
        </form>
      </Paper>
    </motion.div>
  );
}
