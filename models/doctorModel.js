const { INTEGER } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const doctors = sequelize.define('doctors', {

        name: {
            type: DataTypes.STRING
        },
        speciality: {
            type: DataTypes.STRING
        },

        startTime: {
            type: DataTypes.TIME
        },
        endTime: {
            type: DataTypes.TIME
        },
        notAvailableStart: {
            type: DataTypes.DATE
        },
        notAvailableEnd: {
            type: DataTypes.DATE
        }
    })
    return doctors
}