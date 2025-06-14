const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
  sequelize.define('Field', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    label: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('text', 'number', 'dropdown'), allowNull: false },
    options: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true }
  });
