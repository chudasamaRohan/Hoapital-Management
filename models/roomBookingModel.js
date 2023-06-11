const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const roomBookings = sequelize.define('roomBookings', {
        patientId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        roomId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        staffId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        catogary: {
            type: DataTypes.ENUM('special', 'vip', 'genaralRoom'),
        },
        admitDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        chargesperday: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM('active', 'deactive'),
            defaultValue: 'active',
            allowNull: false
        },

    },)
    return roomBookings
}