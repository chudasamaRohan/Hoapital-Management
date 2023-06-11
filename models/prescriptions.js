const { DataTypes } = require("sequelize");
const sequelize = require(".");

module.exports = (sequelize, DataTypes) => {

    const prescriptions = sequelize.define("prescription", {
        patientId: {
            type: DataTypes.INTEGER,
            references: {
                model: "patients",
                key: "id"
            }
        },
        doctorId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        medicine: {
            type: DataTypes.JSON,
            allowNull: false
        },
        syrup: {
            type: DataTypes.JSON
        },
        other: {
            type: DataTypes.STRING
        }
    });
    return prescriptions
}
