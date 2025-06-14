const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { 
  createForm, 
  getForm, 
  getFormByCode // <-- Import the new controller
} = require('../controllers/formController');
const { getResponse, submitResponse } = require('../controllers/responseController');
const { validateUUIDParam } = require('../middleware/uuidValidation');

// Route to join a form by invite code (must be ABOVE '/:id')
router.get('/code/:code', getFormByCode);

router.post('/create', auth, role('admin'), createForm);
router.get('/:id', auth, validateUUIDParam, getForm);
router.get('/:id/response', auth, validateUUIDParam, getResponse);
router.post('/:id/submit', auth, validateUUIDParam, submitResponse);

module.exports = router;
