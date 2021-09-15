import express from 'express';
import crudController from '../controller/crudController';
import userController from '../controller/userController';




let router = express.Router();

let initWebRoutes = (app) => {



    router.get('/view-create-user', crudController.viewCreateUser);

    router.post('/post-create-user', crudController.createUser);

    router.get('/get-users', crudController.getUsers);

    router.get('/edit-user', crudController.editUser);

    router.post('/put-update-user', crudController.updateUser);

    router.get('/delete-remove-user', crudController.removeUser);



    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handlCreateNewUser);
    router.put('/api/edit-user', userController.handlEditUser);
    router.delete('/api/delete-user', userController.handlDeleteUser);

    router.get('/api/allcode', userController.getAllCode);






















    return app.use("/", router);
}


module.exports = initWebRoutes;