import React, { useState } from 'react';
import { api } from '../api';
import CollaborativeForm from './CollaborativeForm';
import { Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function JoinForm() {
  const [code, setCode] = useState('');
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  async function handleJoin(e) {
    e.preventDefault();
    setError('');
    if (!code) {
      setError('Please enter a code.');
      return;
    }
    try {
      const res = await api.get(`/form/code/${code}`);
      if (!res.data?.id || !uuidRegex.test(res.data.id)) {
        setError('Invalid or corrupted form data received.');
        return;
      }
      setForm(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Invalid code or unable to join form.'
      );
    }
  }

  if (form) return <CollaborativeForm form={form} />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4, borderRadius: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Join a Form
        </Typography>
        <form onSubmit={handleJoin}>
          <Stack spacing={2}>
            <TextField
              label="Invite Code"
              value={code}
              onChange={e => setCode(e.target.value)}
              fullWidth
              error={!!error}
              helperText={error}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Join
            </Button>
          </Stack>
        </form>
      </Paper>
    </motion.div>
  );
}
