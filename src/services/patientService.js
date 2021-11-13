import db from '../models/index';
require('dotenv').config();
import emailService from './emailService'
import date from 'date-and-time';
import vi from 'date-and-time/locale/vi';
import en from 'date-and-time/locale/en';
import { v4 as uuidv4 } from 'uuid';
import { status } from '../utils/constant'


let buildUrlEmail = (doctorId, patientId, timeType) => {
    let result = {}
    let token = uuidv4();
    result.url = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}&patientId=${patientId}&timeType=${timeType}`;
    result.token = token;
    return result;
}

let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName || !data.gender
                || !data.address || !data.reason || !data.phoneNumber
            ) {
                resolve({
                    errCode: 1,
                    message: "Missing input parameters",
                })
            } else {

                let dataAllCode = await db.Allcode.findOne({
                    where: { keyMap: data.timeType },
                    attributes: {
                        include: ['valueEn', 'valueVi', 'type'],
                    },
                    raw: true,
                })

                let dayHourBooking;
                let timestamp = data.date;
                let dayBooking = new Date(timestamp);
                let valueDate;
                if (data.language === 'vi') {
                    date.locale(vi);
                    valueDate = date.format(dayBooking, 'dddd, DD MMMM YYYY').toUpperCase();

                    dayHourBooking = `${dataAllCode.valueVi} - ${valueDate}`
                } else {
                    date.locale(en);
                    valueDate = date.format(dayBooking, 'dddd, MMMM DD YYYY').toUpperCase();
                    dayHourBooking = `${dataAllCode.valueEn} - ${valueDate}`
                }


                let doctor = await db.User.findOne({
                    where: { id: data.doctorId, },
                    attributes: {
                        include: ['firstName', 'lastName',],
                    }
                })


                let patient = await db.Patient.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,

                    },
                    raw: true,
                });

                let dataUrl;

                if (patient && patient[0]) {
                    dataUrl = buildUrlEmail(data.doctorId, patient[0].id, data.timeType);

                    let res = await db.Booking.findOrCreate({
                        where: { patientId: patient[0].id, timeType: data.timeType, date: data.date, doctorId: data.doctorId },
                        defaults: {
                            statusId: status.NEW,
                            doctorId: data.doctorId,
                            patientId: patient[0].id,
                            timeType: data.timeType,
                            date: data.date,
                            token: dataUrl.token,
                            fullName: data.fullName,
                            phoneNumber: data.phoneNumber,
                            address: data.address,
                            reason: data.reason,
                            gender: data.gender,

                        },
                        raw: true,
                    });


                    if (res[0] && res[0].statusId === status.CONFIRMED) {
                        resolve({
                            errCode: 2,
                            message: 'You have already booked this appointment, please check again',
                        })
                    }

                    if (res[1] === true && res[0].statusId === status.NEW) {
                        await emailService.sendSimpleEmail({
                            receiverEmail: data.email,
                            patientName: data.fullName,
                            time: dayHourBooking,
                            doctorName: `${doctor.firstName} ${doctor.lastName}`,
                            emailDoctor: doctor.email,
                            language: data.language,
                            linkRedirect: dataUrl.url,
                        });

                    }
                    if (res[1] === false && res[0].statusId === status.NEW) {
                        let urlComfirm = `${process.env.URL_REACT}/verify-booking?token=${res[0].token}&doctorId=${res[0].doctorId}&patientId=${res[0].patientId}&timeType=${res[0].timeType}`;
                        await emailService.sendSimpleEmail({
                            receiverEmail: data.email,
                            patientName: data.fullName,
                            time: dayHourBooking,
                            doctorName: `${doctor.firstName} ${doctor.lastName}`,
                            emailDoctor: doctor.email,
                            language: data.language,
                            linkRedirect: urlComfirm
                        });
                    }






                } else {
                    resolve({
                        errCode: 3,
                        message: 'Not find patient',
                    })
                }


                resolve({
                    errCode: 0,
                    message: 'Save success',
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let postVerifyBookAppointmentService = async (data) => {
    try {

        if (!data.token || !data.doctorId || !data.patientId || !data.timeType) {
            return {
                errCode: 1,
                message: "Missing input parameters",
            }
        } else {
            let verifyPatient = await db.Booking.findOne({
                where: {
                    token: data.token,
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    timeType: data.timeType,
                    statusId: status.NEW
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'doctorId', 'patientId', 'date', 'timeType'],
                },
            })

            if (verifyPatient) {
                verifyPatient.statusId = status.CONFIRMED;
                await verifyPatient.save();

                return {
                    errCode: 0,
                    message: "Verification succeeded",
                }
            } else {
                return {
                    errCode: 2,
                    message: "You have verified this appointment or this appointment does not exist",
                }
            }
        }










    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    postBookAppointmentService: postBookAppointmentService,
    postVerifyBookAppointmentService: postVerifyBookAppointmentService
}