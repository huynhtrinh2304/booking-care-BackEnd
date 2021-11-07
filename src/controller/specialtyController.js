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


let getAllSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getAllSpecialtyService();
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllNameSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getAllNameSpecialtyService();
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
    postCreateNewSpecialty: postCreateNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getAllNameSpecialty: getAllNameSpecialty
}