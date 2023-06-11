const { sequelize } = require(".");
const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
    const staffs = sequelize.define('staffs', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM,
            values: ['nurse', 'pharma', 'lab-staff', 'doctor', 'ot-staff', 'admin'],
        }
    }, {
        hooks: {
            beforeCreate: async (staffs) => {
                if (staffs.password) {
                    const salt = bcrypt.genSaltSync(10, 'a');
                    staffs.password = bcrypt.hashSync(staffs.password, salt);
                }
            },
        },
        instanceMethods: {
            validPassword: (password) => {
                return bcrypt.compareSync(password, this.password);
            }
        }
    })
    staffs.prototype.validPassword = async (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }

    return staffs
}