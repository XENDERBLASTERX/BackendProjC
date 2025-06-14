import React, { useEffect, useState, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { api } from '../api';
import { AuthContext } from '../AuthContext';
import { Button, TextField, Select, MenuItem, Typography } from '@mui/material';

// UUID v4 regex for validation
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const SOCKET_URL = 'http://localhost:4000';

export default function CollaborativeForm({ form }) {
  const { user } = useContext(AuthContext);
  const [response, setResponse] = useState({});
  const [locks, setLocks] = useState({});
  const [presence, setPresence] = useState([]);
  const [error, setError] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    if (!form?.id || !uuidRegex.test(form.id)) {
      setError('Invalid form ID.');
      return;
    }
    if (!user?.id) {
      setError('User not authenticated.');
      return;
    }

    async function fetchResponse() {
      try {
        const res = await api.get(`/form/${form.id}/response`);
        setResponse(res.data.data || {});
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          'Failed to load form response.'
        );
      }
    }

    fetchResponse();

    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });

    socketRef.current.on('connect', () => setSocketConnected(true));
    socketRef.current.on('disconnect', () => setSocketConnected(false));
    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError('Realtime collaboration unavailable');
    });

    socketRef.current.emit('join_form', { formId: form.id, userId: user.id });

    socketRef.current.on('user_presence', setPresence);
    socketRef.current.on('field_locked', ({ fieldId, userId }) =>
      setLocks(l => ({ ...l, [fieldId]: userId }))
    );
    socketRef.current.on('field_unlocked', ({ fieldId }) =>
      setLocks(l => ({ ...l, [fieldId]: null }))
    );
    socketRef.current.on('field_updated', ({ fieldId, value }) =>
      setResponse(r => ({ ...r, [fieldId]: value }))
    );

    return () => {
      socketRef.current.disconnect();
    };
  }, [form.id, user?.id, form, user]);

  function handleFocus(fieldId) {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('field_lock', { fieldId });
    }
  }
  function handleBlur(fieldId) {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('field_unlock', { fieldId });
    }
  }
  function handleChange(fieldId, value) {
    setResponse(r => ({ ...r, [fieldId]: value }));
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('field_update', { formId: form.id, fieldId, value, userId: user.id });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post(`/form/${form.id}/submit`, { data: response });
      alert('Form saved!');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to save form.'
      );
    }
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">{form.title}</Typography>
      {!socketConnected && (
        <Typography color="textSecondary">
          Connecting to collaboration server...
        </Typography>
      )}
      {form.fields.map(field => (
        <div key={field.id} style={{ margin: 8 }}>
          <Typography>{field.label}</Typography>
          {field.type === 'text' && (
            <TextField
              value={response[field.id] || ''}
              disabled={locks[field.id] && locks[field.id] !== user.id}
              onFocus={() => handleFocus(field.id)}
              onBlur={() => handleBlur(field.id)}
              onChange={e => handleChange(field.id, e.target.value)}
            />
          )}
          {field.type === 'number' && (
            <TextField
              type="number"
              value={response[field.id] || ''}
              disabled={locks[field.id] && locks[field.id] !== user.id}
              onFocus={() => handleFocus(field.id)}
              onBlur={() => handleBlur(field.id)}
              onChange={e => handleChange(field.id, e.target.value)}
            />
          )}
          {field.type === 'dropdown' && (
            <Select
              value={response[field.id] || ''}
              disabled={locks[field.id] && locks[field.id] !== user.id}
              onFocus={() => handleFocus(field.id)}
              onBlur={() => handleBlur(field.id)}
              onChange={e => handleChange(field.id, e.target.value)}
            >
              {field.options.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          )}
          {locks[field.id] && locks[field.id] !== user.id && (
            <Typography color="error" variant="caption">Locked by another user</Typography>
          )}
        </div>
      ))}
      <Button type="submit" variant="contained" style={{ marginTop: 16 }}>Save</Button>
      <Typography variant="caption">Online: {presence.join(', ')}</Typography>
    </form>
  );
}
