const { Response } = require('../models');

exports.getResponse = async (req, res) => {
  const response = await Response.findOne({ where: { formId: req.params.id } });
  if (!response) return res.status(404).json({ message: 'No response found' });
  res.json(response);
};

exports.submitResponse = async (req, res) => {
  const { data } = req.body;
  const response = await Response.findOne({ where: { formId: req.params.id } });
  if (!response) return res.status(404).json({ message: 'No response found' });
  response.data = data;
  await response.save();
  res.json({ success: true });
};
