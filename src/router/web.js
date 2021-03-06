import express from 'express';
import crudController from '../controller/crudController';
import userController from '../controller/userController';
import doctorController from '../controller/doctorController';
import patientController from '../controller/patientController';
import specialtyController from '../controller/specialtyController';
import clinicController from '../controller/clinicController';






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


    // Doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor', doctorController.getDetailDoctorById);
    router.put('/api/edit-markdown-doctor', doctorController.putEditMarkdownDoctor);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api/get-infor-doctor', doctorController.getInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    router.get('/api/get-list-paitent-for-doctor', doctorController.getListPatientForDoctor);
    router.post('/api/send-mail-for-patient', doctorController.sendMailForPatient);



    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);


    //specialty
    router.post('/api/create-new-specialty', specialtyController.postCreateNewSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-all-name-specialty', specialtyController.getAllNameSpecialty);
    router.get('/api/get-all-doctor-by-specialty-id', specialtyController.getAllDoctorBySpecialtyId);

    //Clinic
    router.post('/api/create-new-clinic', clinicController.postCreateNewClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.get('/api/get-all-name-clinic', clinicController.getAllNameClinic);
    router.get('/api/get-all-doctor-by-clinic-id', clinicController.getAllDoctorByClinicId);





















    return app.use("/", router);
}


module.exports = initWebRoutes;