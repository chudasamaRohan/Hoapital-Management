const db = require("../../models/index")
const medicines = db.medicines
const prescriptions = db.prescriptions
const patients = db.patients

const seePrescription = async (req, res) => {
    // const name = req.body.name
    const patientData = req.patientData

    const pre = await prescriptions.findOne({
        where: {
            patientId: patientData.id
        },
        include: [
            {
                model: patients,
                attributes: ["name", "age", "gender"]
            }
        ]
    })
    if (pre) {
        res.send(pre)
    } else {
        res.send("messege : user have not prescreption.")
    }
}





const medicinFinder = async (req, res, next) => {
    const { name } = req.body
    const med = await medicines.findOne({
        where: {
            name: name
        }
    })
    if (med) {
        res.send("this medicine is allready exits.plz do update")
    } else {
        next()
    }
}
const medicinSaver = async (req, res) => {
    const staffId = req.id
    const { name, stock, expireDate, price } = req.body
    const md = await medicines.create({ name, stock, expireDate, price, staffId })
    if (md) {
        res.send(md)
    } else {
        res.send("medicin SAver eroor.")
    }
}
const medicinCheck = async (req, res, next) => {
    const { name } = req.body
    const med = await medicines.findOne({
        where: {
            name: name
        }
    })
    if (med) {
        req.fatchData = med
        next()
    } else {
        res.send('this medicine is not available plz enter new entry.')
    }

}

const upDateMedicine = async (req, res) => {
    const fatchData = req.fatchData
    const { stock, expireDate, price } = req.body
    const newStock = stock + fatchData.stock
    const upMed = await medicines.update(
        {
            stock: newStock, expireDate: expireDate, price: price
        },
        {
            where:
            {
                id: fatchData.id
            }
        }
    )
    res.send(upMed)
}



module.exports = {
    medicinFinder,
    medicinSaver,
    medicinCheck,
    upDateMedicine,
    seePrescription
}