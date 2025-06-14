import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Features() {
  return (
    <Box sx={{ py: 6, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Features
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Live collaborative editing" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Real-time presence and field locking" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Admin dashboard and analytics" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Secure authentication" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Beautiful purple theme" />
        </ListItem>
      </List>
    </Box>
  );
}
