const express = require("express")
const bodyparser = require("body-parser")
const patientRoutes = require("./routes/patientRoute")
const adminRoutes = require("./routes/adminRoutes")
const doctorRoutes = require("./routes/doctorRoutes")
const staffRoutes = require("./routes/staffRoutes")
const app = express()
require('dotenv').config()
const db = require("./models/index")
const medicines = db.medicines
console.log("med", medicines);

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


app.use("/patient", patientRoutes)
app.use("/admin", adminRoutes)
app.use("/doctor", doctorRoutes)
app.use("/staff", staffRoutes)



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server connected.");
})