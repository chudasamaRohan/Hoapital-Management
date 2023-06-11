const db = require("../../models/index.js");
const roomBookingModel = require("../../models/roomBookingModel.js");
const rooms = db.rooms
const roomBookings = db.roomBookings

const dischargePatient = async (req, res) => {
    const roomBookingId = req.body.roomBookingId
    const dt = await roomBookings.findOne({
        where: {
            id: roomBookingId
        }
    })
    if (dt) {
        const up = roomBookings.update(
            { status: 'deactive' },
            { where: { id: dt.id } }
        )
        if (up) {
            res.send("discharge succesfully.")
        } else if (!up) {
            res.send("update error.  ")
        }
    } else if (!dt) {
        res.send("messege : this id does not exits in bookingModel")
    }

}


const roomEntry = async (req, res) => {
    const staffId = req.id
    const catogary = req.roomData.catogary
    const chargesperday = req.roomData.chargesperday
    const { patientId, admitDate, roomId } = req.body
    const data = { patientId, staffId, admitDate, roomId, catogary, chargesperday }
    const roomData = await roomBookings.create(data)
    if (roomData) {
        res.send(roomData)
    } else {
        res.send("messege : roomEntry error.")
    }
}

module.exports = { roomEntry, dischargePatient }