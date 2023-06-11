const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize, DataTypes) => {
    const rooms = sequelize.define('rooms', {
        category: {
            type: DataTypes.STRING,
        },
        chargesperday: {
            type: DataTypes.INTEGER
        },
    });
    return rooms
}


