import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #8e24aa 0%, #ce93d8 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={8} sx={{ p: 6, borderRadius: 6, textAlign: 'center', maxWidth: 600 }}>
          <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome to CollabForms
          </Typography>
          <Typography variant="h5" color="secondary" sx={{ mb: 4 }}>
            Real-time collaborative forms for teams and classrooms.<br />
            Edit together. See changes instantly. Enjoy the purple!
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, fontWeight: 600, boxShadow: 4 }}
            >
              Go to Dashboard
            </Button>
            <Button
              component={Link}
              to="/features"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ px: 4, fontWeight: 600 }}
            >
              Explore Features
            </Button>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
}
