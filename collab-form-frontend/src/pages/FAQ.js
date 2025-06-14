import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  return (
    <Box sx={{ py: 6, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Is CollabForms free to use?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Yes! CollabForms is free for all users.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Can I use CollabForms for my team?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Absolutely! It's designed for teams, classrooms, and more.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Is my data secure?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Yes, your data is protected with secure authentication and encryption.</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
