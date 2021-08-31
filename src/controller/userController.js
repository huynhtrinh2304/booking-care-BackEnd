import userService from '../services/userService';




//[POST] /api/login
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!'
        })
    }


    let userData = await userService.handleUserLogin(email, password);



    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,

        user: userData.user ? userData.user : {}

    })
}

//[GET] /api/get-all-users
let handleGetAllUsers = async (req, res) => {

    let id = req.query.id;

    if (!id) {
        return res.status(300).json({
            errCode: 1,
            errMessage: "Missing required parameter",
            users: []

        })
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users

    });


}


//[POST] /api/create-new-user
let handlCreateNewUser = async (req, res) => {

    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);

}

//[PUT] /api/get-all-users
let handlEditUser = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(200).json({
            error: 1,
            message: 'Missing input parameter!'
        });
    }

    let message = await userService.updateUserData(data)

    return res.status(200).json(message);


}

//[DELETE] /api/delete-user
let handlDeleteUser = async (req, res) => {

    if (!req.body.id) {
        return res.status(200).json({
            error: 1,
            errorMessage: 'Missing input parameter!'
        });
    }

    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);


}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handlCreateNewUser: handlCreateNewUser,
    handlEditUser: handlEditUser,
    handlDeleteUser: handlDeleteUser,
}