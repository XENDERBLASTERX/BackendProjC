const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const FormModel = require('./form');
const FieldModel = require('./field');
const ResponseModel = require('./response');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

const User = UserModel(sequelize);
const Form = FormModel(sequelize);
const Field = FieldModel(sequelize);
const Response = ResponseModel(sequelize);

Form.hasMany(Field, { as: 'fields', foreignKey: 'formId' });
Field.belongsTo(Form, { foreignKey: 'formId' });

Form.hasOne(Response, { as: 'response', foreignKey: 'formId' });
Response.belongsTo(Form, { foreignKey: 'formId' });

User.hasMany(Form, { as: 'forms', foreignKey: 'adminId' });
Form.belongsTo(User, { as: 'admin', foreignKey: 'adminId' });

module.exports = { sequelize, User, Form, Field, Response };
