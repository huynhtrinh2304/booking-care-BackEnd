import clinicService from '../services/clinicService';

let postCreateNewClinic = async (req, res) => {
    try {
        let mess = await clinicService.postCreateNewClinicService(req.body);
        return res.status(200).json(mess);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let resData = await clinicService.getAllClinicService(req.body);
        if (resData && resData.data) {
            resData.data.map((value) => {
                value.image = new Buffer(value.image, 'base64').toString('binary');
            })
        }

        return res.status(200).json(resData);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllNameClinic = async (req, res) => {
    try {
        let data = await clinicService.getAllNameClinicService();
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllDoctorByClinicId = async (req, res) => {
    try {
        let data = await clinicService.getAllDoctorByClinicIdService(req.query.id);
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}









module.exports = {
    postCreateNewClinic: postCreateNewClinic,
    getAllClinic: getAllClinic,
    getAllNameClinic: getAllNameClinic,
    getAllDoctorByClinicId: getAllDoctorByClinicId
}