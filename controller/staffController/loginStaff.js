const db = require("../../models/index")
const staffs = db.staffs
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




const staffLogin = async (req, res, next) => {
    const staff = await staffs.findOne({ where: { email: req.body.email } });
    if (staff) {
        const password_valid = await bcrypt.compare(req.body.password, staff.password);
        if (password_valid) {
            token = jwt.sign({ "id": staff.id, "email": staff.email, "role": staff.role }, process.env.SECRET);
            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }
    } else {
        res.status(404).json({ error: "first registarion ." });
    }
}

module.exports = { staffLogin }