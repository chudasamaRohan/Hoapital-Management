const db = require("../models/index")
const appointments = db.appointments

const appointMentSaver = async (data) => {
    const obj = await appointments.create(data)
    console.log('obj', obj);
    return obj
}


const isTimeInRange = async (startTime, endTime, checkTime) => {
    if (checkTime > startTime && checkTime <= endTime) {
        return true
    } else {

        return false
    }
}


const checkTimeDiff = async (req, data) => {
    const visitStartTime = req.body.visitStartTime + ":00";
    const isBookedAppoiment = data.find(x => x.visitStartTime == visitStartTime);
    if (isBookedAppoiment) {
        return false;
    } else {
        return true;
    }
}

const stringToTim = (realTime, bokkedTime) => {

    realTime = realTime.split(":");
    const realTimeHr = realTime[0];
    const realTimeMin = realTime[1];

    bokkedTime = bokkedTime.split(":");
    const bokkedTimeHr = bokkedTime[0];
    const bokkedTimeMin = bokkedTime[1];

    if (realTimeHr == bokkedTimeHr) {
        return false;
    }
    return true;

}

const checkDate = async (leaveStart, leaveEnd, visitDate) => {
    const now = new Date(visitDate);
    const start = new Date(leaveStart.getFullYear(), leaveStart.getMonth(), leaveStart.getDate() + 1);
    const end = new Date(leaveEnd.getFullYear(), leaveEnd.getMonth(), leaveEnd.getDate() + 1);
    if (now >= start && now <= end) {
        return false
    } else {
        return true
    }
}



module.exports = { appointMentSaver, stringToTim, checkTimeDiff, checkDate, isTimeInRange }