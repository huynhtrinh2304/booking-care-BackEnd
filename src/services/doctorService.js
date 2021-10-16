import db from '../models/index';
import _ from 'lodash'
require('dotenv').config();

const MAX_NUMBER_SCHEDULES = process.env.MAX_NUMBER_SCHEDULES;


let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: 'R2'
                },

                attributes: {
                    exclude: ['password',],

                },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },

                ],
                raw: true,
                nest: true,
            })

            resolve({
                errCode: 0,
                users: users
            })


        } catch (e) {
            reject(e)
        }
    })
}


let getAllDoctorsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: {
                    exclude: ['password', 'image'],
                },
            })

            resolve({
                errCode: 0,
                doctors: doctors
            })


        } catch (e) {
            reject(e)
        }
    })
}


let postInforDoctorService = (inforDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inforDoctor.selectedDoctor) {
                resolve({
                    errCode: 1,
                    message: "Please choose a doctor"
                })
            }


            await db.Markdown.create({
                description: inforDoctor.description,
                contentHtml: inforDoctor.contentHtml,
                contentMarkdown: inforDoctor.contentMarkdown,
                doctorId: inforDoctor.selectedDoctor,
            })

            resolve({
                errCode: 0,
                message: 'Save success'
            })



        } catch (error) {
            reject(error)
        }
    })
}



let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing id'
                })
            } else {

                let inforDoctor = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password',],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHtml', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],

                    raw: true,
                    nest: true,
                })

                if (!inforDoctor.Markdown.description && !inforDoctor.Markdown.contentHtml && !inforDoctor.Markdown.contentMarkdown) {
                    inforDoctor.Markdown = 0;
                }

                if (inforDoctor && inforDoctor.image) {

                    inforDoctor.image = new Buffer(inforDoctor.image, 'base64').toString('binary');
                }



                resolve({
                    error: 0,
                    inforDoctor: inforDoctor
                })
            }



        } catch (error) {
            reject(error);
        }
    })
}



let updateMarkdownDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.selectedDoctor) {
                resolve({
                    errCode: 2,
                    message: 'Not find a doctor',
                })
            }

            let detail = await db.Markdown.findOne({
                where: { doctorId: data.selectedDoctor },

            })

            if (!detail) {
                resolve({
                    errCode: 3,
                    message: 'Doctor already exists in the system, Plz try another email other',
                })
            }



            if (detail) {

                detail.description = data.description;
                detail.contentHtml = data.contentHtml;
                detail.contentMarkdown = data.contentMarkdown;
                await detail.save();

                resolve({
                    errCode: 0,
                    message: 'Update success'
                })
            }


        } catch (error) {
            reject(error);
        }
    })
}


let bulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    message: 'Missing input parameter!'
                })


            } else {


                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULES;
                    })
                }

                //Get all scheduled where doctorId and date
                let resSchedule = await db.Schedule.findAll(
                    {
                        where: {
                            doctorId: data.doctorId,
                            date: data.date,

                        },
                        attributes: ['doctorId', 'timeType', 'maxNumber', 'date'],
                        raw: true,
                    }
                )


                // Convert date
                if (resSchedule && resSchedule.length > 0) {
                    resSchedule.map(time => {
                        time.date = new Date(time.date).getTime();
                    })
                }


                // compare 2 array resSchedule(database) and resSchedule to add schedule for doctor
                let compare = _.differenceWith(schedule, resSchedule, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })


                // Crete schedule for doctor
                if (compare && compare.length > 0) {
                    await db.Schedule.bulkCreate(compare);
                }




                resolve({
                    errCode: 0,
                    message: 'ok'
                });

            }









        } catch (error) {
            reject(error);
        }
    })
}



module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctorsService: getAllDoctorsService,
    postInforDoctorService: postInforDoctorService,
    getDetailDoctorById: getDetailDoctorById,
    updateMarkdownDoctor: updateMarkdownDoctor,
    bulkCreateScheduleService: bulkCreateScheduleService
}