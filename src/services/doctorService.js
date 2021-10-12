import db from '../models/index';

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
            if (!inforDoctor.selectedDoctors) {
                resolve({
                    errCode: 1,
                    message: "Please choose a doctor"
                })
            }


            await db.Markdown.create({
                description: inforDoctor.description,
                contentHtml: inforDoctor.contentHtml,
                contentMarkdown: inforDoctor.contentMarkdown,
                doctorId: inforDoctor.selectedDoctors,
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






module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctorsService: getAllDoctorsService,
    postInforDoctorService: postInforDoctorService,
    getDetailDoctorById: getDetailDoctorById
}