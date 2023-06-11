const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config()
const db = require("../models/index")
const patients = db.patients

const staffAuthgaurd = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.id = decoded.id
        req.email = decoded.email
        req.role = decoded.role
        req.name = decoded.name
        next();
    });
}



const patientAuthgaurd = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.id = decoded.id
        req.email = decoded.email
        next();
    });
}



const adminAuthgaurd = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        if (decoded.role == "admin") {
            req.role = decoded.role
            req.id = decoded.id
            req.email = decoded.email
            next();
        } else {
            res.send("messege : only admin can addStaff.")
        }
    });
};








module.exports = { patientAuthgaurd, adminAuthgaurd, staffAuthgaurd }