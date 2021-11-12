import db from '../models/index';


let postCreateNewClinicService = async (data) => {
    try {
        if (!data.imgClinic || !data.contentHtml || !data.contentMarkdown || !data.nameClinic || !data.addressClinic) {
            return {
                errCode: 1,
                message: 'Please enter all information'
            };
        } else {
            await db.Clinic.create({
                name: data.nameClinic,
                image: data.imgClinic,
                descriptionHtml: data.contentHtml,
                descriptionMarkdown: data.contentMarkdown,
                address: data.addressClinic
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

let getAllClinicService = async () => {
    try {
        let data = await db.Clinic.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt',]
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


let getAllNameClinicService = async () => {
    try {
        let data = await db.Clinic.findAll({
            attributes: ['name', 'id'],
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

let getAllDoctorByClinicIdService = async (id) => {
    try {
        if (!id) {
            return {
                errCode: 2,
                message: 'Missing id'
            };
        }

        let data = await db.Doctor_Infors.findAll({
            where: { clinicId: id },
            attributes: ['doctorId'],
            raw: true,
        });

        let clinic = await db.Clinic.findOne({
            where: { id: id },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: true,
        });

        if (data && clinic) {
            return {
                errCode: 0,
                clinic: clinic,
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
    postCreateNewClinicService: postCreateNewClinicService,
    getAllClinicService: getAllClinicService,
    getAllNameClinicService: getAllNameClinicService,
    getAllDoctorByClinicIdService: getAllDoctorByClinicIdService
}