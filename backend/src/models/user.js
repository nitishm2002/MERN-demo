const bcrypt = require("bcryptjs");
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection/connection');

const saltRounds = 10;

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
}, {
    tableName: 'user',
    timestamps: false,
});

module.exports = User;
