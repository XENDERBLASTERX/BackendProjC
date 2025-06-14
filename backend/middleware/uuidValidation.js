// middleware/uuidValidation.js
const { param, validationResult } = require('express-validator');

exports.validateUUIDParam = [
  param('id')
    .isUUID(4)
    .withMessage('Invalid UUID format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
