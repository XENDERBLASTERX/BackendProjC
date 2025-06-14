import React, { useEffect, useState } from 'react';
import { api } from '../api';
import CreateForm from './CreateForm';
import {
  Button, Typography, List, ListItem, ListItemText, Paper, Box, Divider, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [forms, setForms] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    async function fetchForms() {
      const res = await api.get('/form/my');
      setForms(res.data);
    }
    fetchForms();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="h4" color="primary" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button
            variant={showCreate ? 'outlined' : 'contained'}
            startIcon={<AddIcon />}
            color="primary"
            onClick={() => setShowCreate(!showCreate)}
          >
            {showCreate ? 'Close' : 'Create New Form'}
          </Button>
        </Stack>
        {showCreate && <CreateForm onCreated={form => setForms([...forms, form])} />}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Your Forms</Typography>
        <List>
          {forms.length === 0 && <Typography color="textSecondary">No forms yet. Create your first one!</Typography>}
          {forms.map(form => (
            <ListItem key={form.id} sx={{ borderRadius: 2, mb: 1, bgcolor: '#f3e5f5' }}>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 600 }}>{form.title}</Typography>}
                secondary={
                  <Typography variant="caption" color="secondary">
                    Invite code: <b>{form.code}</b>
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </motion.div>
  );
}
