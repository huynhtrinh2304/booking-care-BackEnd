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
                desriptionMarkdown: data.contentMarkdown,
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



module.exports = {
    postCreateNewSpecialtyService: postCreateNewSpecialtyService
}