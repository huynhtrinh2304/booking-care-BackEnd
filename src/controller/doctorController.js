import doctorService from '../services/doctorService'


// [GET] /api/top-doctor-home
let getTopDoctorHome = async (req, res) => {
    let reqLimit = req.query.limit;
    if (!reqLimit) reqLimit = 10;

    try {

        let doctor = await doctorService.getTopDoctorHome(+reqLimit);
        return res.status(200).json(doctor)

    } catch (error) {
        console.log(error);
        return res.status(300).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

// [GET] /api/get-all-doctors
let getAllDoctors = async (req, res) => {

    try {
        let doctors = await doctorService.getAllDoctorsService();
        return res.status(200).json(doctors);



    } catch (error) {
        console.log(error);
        return res.status(300).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}





let postInforDoctor = async (req, res) => {
    try {

        let response = await doctorService.postInforDoctorService(req.body);

        return res.status(200).json(response)


    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}



let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(infor)



    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let putEditMarkdownDoctor = async (req, res) => {
    try {
        let data = req.body;
        if (!data) {
            return res.status(200).json({
                error: 1,
                message: 'Missing input parameter!'
            });
        }

        let message = await doctorService.updateMarkdownDoctor(data)

        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        });
    }

}



let bulkCreateSchedule = async (req, res) => {
    try {

        let message = await doctorService.bulkCreateScheduleService(req.body);
        return res.status(200).json(message)



    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        });
    }

}



module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    putEditMarkdownDoctor: putEditMarkdownDoctor,
    bulkCreateSchedule: bulkCreateSchedule
}