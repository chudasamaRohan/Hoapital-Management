const db = require("../models/index")
const patients = db.patients


const patientSaver = async (data) => {
    const obj = await patients.create(data)
    console.log('obj', obj);
    return obj
}


module.exports = { patientSaver }