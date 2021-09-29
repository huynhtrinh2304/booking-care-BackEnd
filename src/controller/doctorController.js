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






module.exports = {
    getTopDoctorHome: getTopDoctorHome,

}