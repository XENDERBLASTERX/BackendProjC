const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
  sequelize.define('Response', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    data: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} }
  });
