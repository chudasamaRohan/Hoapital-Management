const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const db = require("../models/index")
const rooms = db.rooms
const staffs = db.staffs

const { staffSaver } = require("../services/staffServices")


const createRoom = async (req, res) => {
    const { category, chargesperday } = req.body
    const rm = await rooms.create({ category, chargesperday })
    if (rm) {
        res.send("messege : room entry success.")
    } else {
        res.send("mesege : room create error.")
    }
}


const createAdmin = async (req, res) => {
    const { name, email, password, role } = req.body

    const admin = await staffs.create({ name, email, password, role })
    if (admin) {
        res.send(admin)
    } else {
        res.send("messege : admin no save.")
    }
}


const adminLogin = async (req, res) => {
    const admin = await staffs.findOne({ where: { email: req.body.email } });
    if (admin) {
        const password_valid = await bcrypt.compare(req.body.password, admin.password);
        if (password_valid) {
            token = jwt.sign({ "id": admin.id, "email": admin.email, "role": admin.role }, process.env.SECRET);
            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }
    } else {
        res.status(404).json({ error: "first registarion ." });
    }
}

const addStaff = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        const staffObj = await staffSaver({ name, email, password, role })
        if (staffObj) {
            res.send("messege : staff add succefully.")
        }
    } catch (error) {
        res.send(error)
    }
}



module.exports = { addStaff, adminLogin, createAdmin, createRoom }