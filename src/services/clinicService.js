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





module.exports = {
    postCreateNewClinicService: postCreateNewClinicService,

}