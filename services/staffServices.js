const db = require("../models/index")
const staffs = db.staffs


const staffSaver = async (data) => {
    const obj = await staffs.create(data)
    return obj
}

const roomAvailibility = async (req, res, next) => {
    const data = await db.roomBookings.findOne({
        where: {
            roomId: req.roomData.id
        },
    })
    if (data) {
        if (data.status == "deactive") {
            next()
        } else if (data.status == "active") {
            res.send("messege : this room id allready booked.")
        }
    } else if (data == null) {
        next()
    }
}




module.exports = { staffSaver, roomAvailibility }