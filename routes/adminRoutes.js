const express = require("express")
const adminRoutes = express.Router()


const { addStaff, adminLogin, createAdmin, createRoom } = require("../controller/adminController")
const { adminAuthgaurd } = require("../jwt/authgaurd_login")
const { checkAdmin } = require("../middlewear/finder")


adminRoutes.post("/createAdmin", createAdmin)
adminRoutes.post("/login", adminLogin)
adminRoutes.post("/addstaff", adminAuthgaurd, addStaff)
adminRoutes.post("/createRoom", adminAuthgaurd, checkAdmin, createRoom)

module.exports = adminRoutes 