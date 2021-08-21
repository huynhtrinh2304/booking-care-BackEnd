
import CRUDService from '../services/CRUDService';

//[GET] /view-create-user
let viewCreateUser = (req, res) => {
    try {
        res.render('createUser',)

    } catch (error) {
        console.log(error);
    }

}


//[POST] /post-create-user
let createUser = async (req, res) => {
    await CRUDService.createNewUser(req.body)
    res.redirect('/view-create-user')


}


//[GET] /get-users
let getUsers = async (req, res) => {
    let data = await CRUDService.getAllUsers()

    res.render('homePage.ejs', { data: data })



}

//[GET] /edit-user
let editUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId);
        res.render('editUser', {
            userData: userData
        })
    } else {
        res.redirect('/get-users')
    }


}



//[PUT] /put-update-user
let updateUser = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);

    return res.redirect('/get-users')
}

//[DELETE] /delete-remove-user
let removeUser = async (req, res) => {
    let id = req.query.id;
    await CRUDService.deleteUserById(id);
    return res.redirect('/get-users')

}





module.exports = {
    viewCreateUser: viewCreateUser,
    createUser: createUser,
    getUsers: getUsers,
    editUser: editUser,
    updateUser: updateUser,
    removeUser: removeUser

}
