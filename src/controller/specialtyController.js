import specialtyService from '../services/specialtyService'

let postCreateNewSpecialty = async (req, res, next) => {
    try {
        let mess = await specialtyService.postCreateNewSpecialtyService(req.body);
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
    postCreateNewSpecialty: postCreateNewSpecialty
}