const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const medicines = sequelize.define('medicines', {
        name: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        expireDate: {
            type: DataTypes.DATE
        },
        price: {
            type: DataTypes.FLOAT
        },
        staffId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    })
    return medicines
}