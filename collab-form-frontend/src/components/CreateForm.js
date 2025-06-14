import React, { useState } from 'react';
import { api } from '../api';
import { Button, TextField, Typography, Select, MenuItem, Paper, Stack, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function CreateForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ label: '', type: 'text', options: '' });

  function addField() {
    setFields([...fields, { ...newField, options: newField.type === 'dropdown' ? newField.options.split(',').map(o => o.trim()) : undefined }]);
    setNewField({ label: '', type: 'text', options: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.post('/form/create', { title, fields });
    onCreated && onCreated(res.data);
    setTitle('');
    setFields([]);
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2, borderRadius: 3 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Create New Form
      </Typography>
      <Stack spacing={2} direction="column">
        <TextField label="Form Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField label="Field Label" value={newField.label} onChange={e => setNewField(f => ({ ...f, label: e.target.value }))} />
            <Select value={newField.type} onChange={e => setNewField(f => ({ ...f, type: e.target.value }))}>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
            </Select>
            {newField.type === 'dropdown' && (
              <TextField label="Options (comma separated)" value={newField.options} onChange={e => setNewField(f => ({ ...f, options: e.target.value }))} />
            )}
            <Button onClick={addField} variant="outlined" startIcon={<AddCircleOutlineIcon />} color="secondary">
              Add Field
            </Button>
          </Stack>
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">Fields:</Typography>
          <ul>
            {fields.map((f, i) => (
              <li key={i}>{f.label} ({f.type}) {f.type === 'dropdown' && `: [${f.options.join(', ')}]`}</li>
            ))}
          </ul>
        </Box>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Create Form
        </Button>
      </Stack>
    </Paper>
  );
}
