const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const patients = sequelize.define('patients', {
        name: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        contact: {
            type:
                DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },

    },
        {
            hooks: {
                beforeCreate: async (patients) => {
                    if (patients.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        patients.password = bcrypt.hashSync(patients.password, salt);
                    }
                },
            },
            instanceMethods: {
                validPassword: (password) => {
                    return bcrypt.compareSync(password, this.password);
                }
            }
        })
    patients.prototype.validPassword = async (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
    return patients
}


