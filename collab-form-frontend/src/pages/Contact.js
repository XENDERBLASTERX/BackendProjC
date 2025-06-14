import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Box sx={{ py: 6, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Contact Us
      </Typography>
      {!sent ? (
        <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <TextField label="Your Email" type="email" fullWidth required sx={{ mb: 2 }} />
          <TextField label="Message" multiline rows={4} fullWidth required sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="primary">Send</Button>
        </form>
      ) : (
        <Typography color="secondary" sx={{ mt: 2 }}>
          Thank you for reaching out! We'll get back to you soon.
        </Typography>
      )}
    </Box>
  );
}
