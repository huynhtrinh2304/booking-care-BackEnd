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


module.exports = {
    postCreateNewClinic: postCreateNewClinic

}