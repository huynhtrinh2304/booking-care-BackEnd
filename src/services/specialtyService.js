import db from '../models/index';


let postCreateNewSpecialtyService = async (data) => {
    try {
        if (!data.imgSpecialty || !data.contentHtml || !data.contentMarkdown || !data.nameSpecialty) {
            return {
                errCode: 1,
                message: 'Please enter all information'
            };
        } else {
            await db.Specialty.create({
                name: data.nameSpecialty,
                image: data.imgSpecialty,
                descriptionHtml: data.contentHtml,
                descriptionMarkdown: data.contentMarkdown,
            })
            return {
                errCode: 0,
                message: 'Add success'
            };


        }
    } catch (error) {
        console.log(error);
    }
}

let getAllSpecialtyService = async () => {
    try {
        let data = await db.Specialty.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt',]
            },
            // include: [
            //     { model: db.Specialty, as: 'specialty', attributes: ['descriptionHtml'] },
            // ],
            raw: true,
        });
        if (data) {
            return {
                errCode: 0,
                data: data,
            };
        } else {
            return {
                errCode: 1,
                message: 'Not find specialty service'
            };
        }
    } catch (error) {
        console.log(error);
    }
}

let getAllNameSpecialtyService = async () => {
    try {
        let data = await db.Specialty.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'image', 'descriptionHtml', 'descriptionMarkdown']

            },
            raw: true,
        });
        if (data) {
            return {
                errCode: 0,
                data: data,
            };
        } else {
            return {
                errCode: 1,
                message: 'Not find specialty service'
            };
        }
    } catch (error) {
        console.log(error);
    }
}

let getAllDoctorBySpecialtyIdService = async (id) => {
    try {
        let data = await db.Doctor_Infors.findAll({
            where: { specialtyId: id },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: true,
        });

        let specialty = await db.Specialty.findOne({
            where: { id: id },
            attributes: {
                exclude: ['createdAt', 'updatedAt',]
            },
            raw: true,
        });

        if (data) {
            return {
                errCode: 0,
                specialty: specialty,
                data: data,

            };
        } else {
            return {
                errCode: 1,
                message: 'Not find specialty service'
            };
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    postCreateNewSpecialtyService: postCreateNewSpecialtyService,
    getAllSpecialtyService: getAllSpecialtyService,
    getAllNameSpecialtyService: getAllNameSpecialtyService,
    getAllDoctorBySpecialtyIdService: getAllDoctorBySpecialtyIdService
}