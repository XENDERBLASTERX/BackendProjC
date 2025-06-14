const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
  sequelize.define('Form', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, unique: true, allowNull: false }
  });
