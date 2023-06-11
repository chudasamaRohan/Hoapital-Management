const { Sequelize, DataTypes } = require("sequelize")
const dbConfig = require("../config/dbConfig")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const patients = require("../models/patientModel")(sequelize, DataTypes)
const staffs = require("../models/staffModel")(sequelize, DataTypes)
const doctors = require("../models/doctorModel")(sequelize, DataTypes)
const appointments = require("../models/appintmentModel")(sequelize, DataTypes)
const roomBookings = require("./roomBookingModel")(sequelize, DataTypes)
const rooms = require("../models/roomModel")(sequelize, DataTypes)
const medicines = require("../models/medicineModel")(sequelize, DataTypes)
const prescriptions = require("../models/prescriptions")(sequelize, DataTypes)


prescriptions.hasMany(doctors)
prescriptions.hasMany(patients)
patients.belongsTo(prescriptions)
doctors.belongsTo(prescriptions)
staffs.hasMany(medicines)
medicines.belongsTo(staffs)
rooms.hasMany(roomBookings)
roomBookings.belongsTo(rooms)
patients.hasMany(roomBookings);
roomBookings.belongsTo(patients)
staffs.hasMany(roomBookings, { foreignKey: 'staffId' })
roomBookings.belongsTo(staffs)
doctors.hasMany(appointments);
patients.hasMany(appointments);
appointments.belongsTo(doctors);
appointments.belongsTo(patients);

const db = {}
db.prescriptions = prescriptions
db.medicines = medicines
db.doctors = doctors
db.staffs = staffs;
db.patients = patients
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.appointments = appointments
db.roomBookings = roomBookings;
db.rooms = rooms

db.sequelize.sync({ force: false }).then(() => {

    console.log("db- synced");

});

module.exports = db