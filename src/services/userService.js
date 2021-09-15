import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);



let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)

            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,

                })

                if (user) {

                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK"
                        delete user.password;
                        userData.user = user;



                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password"

                    }


                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User's not found";

                }



            } else {
                userData.errCode = 1;
                userData.errMessage = "Your's Email isn's exist in system. Plz try other email";

            }
            resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }


    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)

            }


        } catch (error) {
            reject(error)
        }
    })
}


let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                        raw: true,
                    },

                })
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                        raw: true,

                    }
                })
            }
            resolve(users);




        } catch (error) {
            reject(error)
        }
    })
}


let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check Email exist
            let checkEmail = await checkUserEmail(data.email)
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email already exists in the system, Plz try another email other'
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);

                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })

                resolve({
                    errCode: 0,
                    message: 'Ok'
                });
            }




        } catch (error) {
            reject(error);
        }
    })
}


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {


        try {

            if (!data.email) {
                resolve({
                    errCode: 2,
                    message: 'You missing input an email',
                })
            }

            let user = await db.User.findOne({
                where: { email: data.email },

            })

            if (!user) {
                resolve({
                    errCode: 3,
                    message: 'Your email already exists in the system, Plz try another email other',
                })
            }

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address
                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update success'
                })
            }


        } catch (error) {
            reject(error);
        }
    })
}


let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'Delete failed'
                });
            }

            await user.destroy();

            resolve({
                errCode: 0,
                message: 'Delete success'
            });



        } catch (error) {
            reject(error);
        }
    })
}


let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'You missing required parameter'
                });

            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allCode

                resolve(res);

            }




        } catch (error) {
            reject(error);
        }
    })
}





module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService
}