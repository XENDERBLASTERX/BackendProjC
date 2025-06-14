const { Form, Field, Response } = require('../models');
const { nanoid } = require('nanoid');

// Create a new form
exports.createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    const code = nanoid(8);
    const form = await Form.create({ title, code, adminId: req.user.id });
    for (const field of fields) {
      await Field.create({ ...field, formId: form.id });
    }
    await Response.create({ formId: form.id, data: {} });
    res.json({ formId: form.id, code });
  } catch (error) {
    res.status(500).json({ message: 'Error creating form', error: error.message });
  }
};

// Get form by UUID
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id, {
      include: [{ model: Field, as: 'fields' }]
    });
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError' && error.parent?.code === '22P02') {
      return res.status(400).json({ message: 'Invalid form ID format' });
    }
    res.status(500).json({ message: 'Error fetching form', error: error.message });
  }
};

// Get form by invite code
exports.getFormByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const form = await Form.findOne({
      where: { code },
      include: [{ model: Field, as: 'fields' }]
    });
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
