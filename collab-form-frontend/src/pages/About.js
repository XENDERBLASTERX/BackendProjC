import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box sx={{
      textAlign: 'center',
      py: 8,
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Typography variant="h2" color="primary" gutterBottom>
        Welcome to CollabForms
      </Typography>
      <Typography variant="h5" color="secondary" gutterBottom>
        Real-time collaborative forms for teams and classrooms.
      </Typography>
      <Button
        component={Link}
        to="/dashboard"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}
