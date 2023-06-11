const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const appointments = sequelize.define('appointments', {
        patientId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        doctorId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        visitDate: {
            type: DataTypes.DATE
        },
        visitStartTime: {
            type: DataTypes.TIME
        },
        discription: {
            type: DataTypes.STRING
        }
    })
    return appointments
}